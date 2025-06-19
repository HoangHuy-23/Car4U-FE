"use client";
import ProcessBooking from "@/components/shared/booking/ProcessBooking";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/stores/booking.store";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { selectedCar, clear } = useBookingStore();

  return (
    <section className="bg-neutral-100 py-8 min-h-[80vh] w-full flex justify-center items-center">
      <div className="container max-w-[800px]">
        <Button
          className="bg-white hover:bg-slate-50 text-blue-500 mb-4"
          onClick={() => {
            router.back();
            clear();
          }}
        >
          <ChevronLeft /> Trở về
        </Button>
        <div className="bg-white border rounded-md flex flex-col justify-center items-center px-8">
          <ProcessBooking />
          {children}
        </div>
      </div>
    </section>
  );
}
