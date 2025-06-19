"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import axiosClient from "@/lib/axiosClient";
import { Car } from "@/types/car.type";

type Message = {
  role: "user" | "assistant";
  content: string;
  carResults?: Car[]; // Optional field for car search results
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Giả lập API gọi backend AI
    const res = await axiosClient.post("/chatbot/ask", {
      message: input,
    });

    const aiMessage: Message = {
      role: "assistant",
      content:
        res.data.message || "Xin lỗi, mình chưa hiểu rõ câu hỏi của bạn.",
      carResults: res.data.results.data || [], // Optional field for car search results
    };
    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-center">Trợ lý AI thuê xe</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[450px]">
        <div className="flex-1 overflow-y-auto space-y-3 pb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                key={idx}
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground self-end"
                    : "bg-muted text-muted-foreground self-start"
                )}
              >
                {msg.carResults && msg.carResults.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {msg.carResults.map((car) => (
                      <div
                        key={car.id}
                        className="border rounded-xl p-3 shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => {
                          window.location.href = `/cars/${car.id}`;
                        }}
                      >
                        <div className="font-semibold">{car.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {car.brand} {car.model}
                        </div>
                        <div className="text-primary font-medium">
                          {car.pricePerDay.toLocaleString()} VND/ngày
                        </div>
                        {car.images && (
                          <img
                            src={car.images[0]}
                            alt={car.name}
                            className="mt-2 rounded-md object-cover h-32 w-full"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-muted-foreground text-sm italic">
              Đang trả lời...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Input
            ref={inputRef}
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={sendMessage} disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
