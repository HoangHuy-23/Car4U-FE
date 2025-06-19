"use client";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useBookingStore } from "@/stores/booking.store";
import React, { useEffect, useState } from "react";


export default function ProcessBooking() {
  const [progress, setProgress] = useState(0);

  const { bookingStep } = useBookingStore();

  const [isContact, setIsContact] = useState<boolean>(true);
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const updateState = (bookingStep: number | null) => {
    switch (bookingStep) {
      case 2:
        setIsContact(false);
        setIsPayment(true);
        setIsSuccess(false);
        setProgress(50);
        break;
      case 3:
        setIsContact(false);
        setIsPayment(false);
        setIsSuccess(true);
        setProgress(100);
        break;
      default:
        setIsContact(true);
        setIsPayment(false);
        setIsSuccess(false);
        setProgress(0);
    }
  };

  useEffect(() => {
    updateState(bookingStep);
  }, [bookingStep]);

  return (
    <div className="w-full flex-col flex justify-center items-center mt-6">
      <div className="w-[70%] relative flex flex-col gap-2 items-center justify-center">
        <div className="w-full flex justify-between z-10">
          <div className="flex flex-col justify-between items-center gap-3">
            <div
              className={`${
                isContact ? "bg-blue-500" : "bg-white"
              } border border-blue-500 rounded-full w-10 h-10 flex justify-center items-center`}
            >
              <span>1</span>
            </div>
            <span>Hợp đồng</span>
          </div>
          <div className="flex flex-col justify-between items-center">
            <div
              className={`${
                isPayment ? "bg-blue-500" : "bg-white"
              } border border-blue-500 rounded-full w-10 h-10 flex justify-center items-center`}
            >
              <span>2</span>
            </div>
            <span>Thanh toán</span>
          </div>
          <div className="flex flex-col justify-between items-center">
            <div
              className={`${
                isSuccess ? "bg-blue-500" : "bg-white"
              } border border-blue-500 rounded-full w-10 h-10 flex justify-center items-center`}
            >
              <span>3</span>
            </div>
            <span>Thành công</span>
          </div>
        </div>
        <Progress value={progress} className="w-[90%] absolute top-4" />
      </div>
      <Separator className="h-1 bg-blue-300 mt-5" />
    </div>
  );
}
