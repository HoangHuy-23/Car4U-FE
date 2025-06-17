"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stores/user.store";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function DialogEditPhone() {
  const { user } = useUserStore();

  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState(user?.phone);

  useEffect(() => {
    if (isOpen) {
      setPhone(user?.phone);
    }
  }, [isOpen, user]);

  const handleSave = () => {
    // if (user && user.id !== undefined) {
    //   const req: User = {
    //     ...user,
    //     phone: user.phone,
    //   };
    //   mutate(req);
    //   setIsOpen(false);
    // } else {
    //   console.error("Phone number update error");
    // }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="ml-2 px-1 py-1">
          <Pencil width={16} height={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật số điện thoại</DialogTitle>
        </DialogHeader>
        <Input
          id="name"
          placeholder="Nhập số điện thoại"
          value={phone || ""}
          className=""
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-300"
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
