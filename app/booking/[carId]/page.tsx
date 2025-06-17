"use client";
import BookingSuccess from "@/components/shared/booking/BookingSuccess";
import ContactInformation from "@/components/shared/booking/ContactInformation";
import Payment from "@/components/shared/booking/Payment";
import { useBookingStore } from "@/stores/booking.store";
import { use } from "react"; // <== Quan trọng
import React, { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ carId: string }>;
}) {
  const { bookingStep } = useBookingStore();

  const [isContact, setIsContact] = useState<boolean>(false);
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [totalRent, setTotalRent] = useState<number>(0);

  const { carId } = use(params); // ✅ Dùng use() để unwrap Promise

  const updateState = (bookingStep: number | null) => {
    switch (bookingStep) {
      case 2:
        setIsContact(false);
        setIsPayment(true);
        setIsSuccess(false);
        break;
      case 3:
        setIsContact(false);
        setIsPayment(false);
        setIsSuccess(true);
        break;
      default:
        setIsContact(true);
        setIsPayment(false);
        setIsSuccess(false);
    }
  };

  useEffect(() => {
    updateState(bookingStep);
  }, [bookingStep]);

  return (
    <div className="flex flex-col w-full my-6">
      {/* <ContactInformation
        carId={carId}
        isContact={isContact}
        setTotalRent={setTotalRent}
      />
      <Payment isPayment={isPayment} amount={totalRent} />
      <BookingSuccess isSuccess={isSuccess} /> */}
    </div>
  );
}
