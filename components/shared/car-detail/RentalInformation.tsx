import React, { useEffect, useState } from "react";

import { ChevronDown } from "lucide-react";

import { useRouter } from "next/navigation";
import { Car } from "@/types/car.type";
import { formatCurrency } from "@/lib/currencyFormat";
import { DateTimeRentalInformationDialog } from "../dialog/DateTimeRentalInformationDialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import AddressRentalInformationDialog from "../dialog/AddressRentalInformationDialog";
import { useSearchStore } from "@/stores/search.store";
import { useBookingStore } from "@/stores/booking.store";
import { calculateDaysDifference } from "@/lib/dateFormat";
import { calculatorInsurance, calculatorRentalFee } from "@/lib/calculator";
import { useUserStore } from "@/stores/user.store";
import { toast } from "sonner";

type Props = {
  data: Car | null;
  isLoading: boolean;
  isError: boolean;
};

export default function RentalInformation({ data, isLoading, isError }: Props) {
  const router = useRouter();
  const {
    pickupDate,
    returnDate,
    setPickupDate,
    setReturnDate,
    setBookingStep,
    setSelectedCar,
  } = useBookingStore();
  const [daysDifference, setDaysDifference] = useState<number>();

  useEffect(() => {
    const updatedDaysDifference = calculateDaysDifference(
      pickupDate || new Date(),
      returnDate || new Date()
    );
    setDaysDifference(updatedDaysDifference);
  }, [pickupDate, returnDate]);

  const { user } = useUserStore();

  const handleSubmit = async () => {
    if (!data) return;
    if (!user) {
      toast.error("Bạn cần đăng nhập để thực hiện đặt xe.");
      return;
    }
    if (!user.driverLicense) {
      toast.error("Bạn cần cập nhật giấy phép lái xe để thực hiện đặt xe.");
      return;
    }
    setSelectedCar(data);
    requestAnimationFrame(() => {
      setBookingStep(1);
      router.push(`/booking/${data?.id}/contact-information`);
    });
  };

  return (
    <div className="bg-blue-50 rounded-md px-6 py-4 flex flex-col gap-4">
      <div>
        <h4 className="text-3xl font-semibold">
          {formatCurrency(data?.pricePerDay || 0)} <span> /ngày</span>
        </h4>
      </div>
      <DateTimeRentalInformationDialog />

      <AddressRentalInformationDialog data={data} />
      <Separator />
      <div>
        <div className="flex justify-between">
          <span>Đơn giá thuê </span>
          <span>{formatCurrency(data?.pricePerDay || 0)} /ngày</span>
        </div>
        <div className="flex justify-between">
          <span>Bảo hiểm thuê xe</span>
          <span>
            {formatCurrency(calculatorInsurance(data?.pricePerDay || 0))} /ngày
          </span>
        </div>
      </div>
      <Separator />
      <div>
        <div className="flex justify-between">
          <span>Tổng cộng </span>
          <span>
            {formatCurrency(calculatorRentalFee(data?.pricePerDay || 0, 1))} x{" "}
            {daysDifference} ngày
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between font-bold">
          <span>Thành tiền (chưa tính VAT) </span>
          <span>
            {formatCurrency(
              calculatorRentalFee(data?.pricePerDay || 0, daysDifference || 1)
            )}{" "}
          </span>
        </div>
        <Button
          className="bg-blue-500 text-white hover:bg-blue-300 w-full"
          onClick={handleSubmit}
          disabled={
            isLoading ||
            isError ||
            !pickupDate ||
            !returnDate ||
            daysDifference === undefined ||
            daysDifference <= 0 ||
            !data ||
            data.status.toString() !== "AVAILABLE"
          }
        >
          Chọn thuê
        </Button>
      </div>
    </div>
  );
}
