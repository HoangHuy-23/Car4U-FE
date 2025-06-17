"use client";
import {
  calculatorInsurance,
  calculatorRentalFee,
  calculatorVAT,
} from "@/lib/calculator";
import { calculateDaysDifference } from "@/lib/dateFormat";
import { useBookingStore } from "@/stores/booking.store";
import { useUserStore } from "@/stores/user.store";
import { RentalContact, RentalStatus } from "@/types/contact.type";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function PaymentCallback() {
  const router = useRouter();
  const {
    selectedCar,
    returnDate,
    pickupDate,
    pickupLocation,
    bookingStep,
    setBookingStep,
    createContact,
  } = useBookingStore();
  const { user } = useUserStore();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const called = useRef(false);

  useEffect(() => {
    console.log("user", user);
    console.log("selectedCar", selectedCar);
    console.log("pickupDate", pickupDate);
    console.log("returnDate", returnDate);
    console.log("pickupLocation", pickupLocation);
  }, []);

  const [isHydrated, setIsHydrated] = useState(false);

  // khi Zustand hydrate xong
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (called.current || !isHydrated) return;

    const handlePaymentResponse = async () => {
      const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
      const originalUrlParam = searchParams.get("originalUrl");

      if (originalUrlParam) {
        setOriginalUrl(decodeURIComponent(originalUrlParam));
      }

      if (vnp_ResponseCode) {
        called.current = true;
        switch (vnp_ResponseCode) {
          case "00":
            setStatus("Success");
            setMessage("Your payment was successful.");

            // const insuranceValue = calculatorInsurance(selectedCar?.pricePerDay || 0);

            const diffDayValue = calculateDaysDifference(
              pickupDate!,
              returnDate!
            );
            const feeValue = calculatorRentalFee(
              selectedCar?.pricePerDay || 0,
              diffDayValue
            );
            const vatValue = calculatorVAT(feeValue);
            const totalValue = feeValue + vatValue;

            const req: RentalContact = {
              carId: selectedCar?.id || "",
              renterId: user?.id || "",
              ownerId: selectedCar?.ownerId || "",
              pickupDate: pickupDate,
              returnDate: returnDate,
              pickupLocation: pickupLocation,
              rentalFee: feeValue,
              vat: vatValue,
              totalFee: totalValue,
              depositFee: 500000,
              collateralAmount: selectedCar?.collateralAmount || 0,
              status: RentalStatus.PENDING,
            };

            try {
              const contact = await createContact(req);
              setBookingStep(3);
            } catch (error) {
              setStatus("Error");
              setMessage("Failed to create contact.");
            }
            break;
          case "24":
            setStatus("Cancel");
            setMessage("Your payment was cancelled.");
            setBookingStep(1);
            router.push(`/booking/${selectedCar?.id}/contact-information`);
            break;
          default:
            setStatus("Failed");
            setMessage("An error occurred during your payment.");
            break;
        }
      } else {
        setStatus("Error");
        setMessage("An error occurred while processing your payment.");
      }
    };

    handlePaymentResponse();
  }, [searchParams, isHydrated]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Payment Status</h1>
      {status === "Success" ? (
        <p className="text-green-500 text-xl">{message}</p>
      ) : status === "Cancel" ? (
        <p className="text-yellow-500 text-xl">{message}</p>
      ) : (
        <p className="text-red-500 text-xl">{message}</p>
      )}
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => router.push("/")}
      >
        Go to Homepage
      </button>
    </div>
  );
}
