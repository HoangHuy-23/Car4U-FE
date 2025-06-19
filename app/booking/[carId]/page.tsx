"use client";
import { useBookingStore } from "@/stores/booking.store";
import { useEffect, useState } from "react";

interface BookingPageProps {
  params: { carId: string };
}

export default function Page({ params }: BookingPageProps) {
  const { bookingStep } = useBookingStore();

  const [isContact, setIsContact] = useState<boolean>(false);
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [totalRent, setTotalRent] = useState<number>(0);

  const carId = params.carId;

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
