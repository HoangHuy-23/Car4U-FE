"use client";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/stores/booking.store";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();
  const { getPaymentLink} = useBookingStore();
  const handleBtnVNPay = async () => {
    const payment = await getPaymentLink(2500000);
    router.push(`${payment.paymentUrl}`);
  };
  return (
    <div className="flex flex-col w-full my-6">
      <h1 className="text-left w-full text-2xl font-semibold">
        Chọn phương thức thanh toán
      </h1>
      <div className="flex justify-around mt-6">
        <Button className="bg-purple-500 hover:bg-purple-300 w-[240px]">
          Momo
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-300 w-[240px]"
          onClick={handleBtnVNPay}
        >
          VNPay
        </Button>
      </div>
    </div>
  );
}
