"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { calculatorRentalFee, calculatorVAT } from "@/lib/calculator";
import { formatCurrency } from "@/lib/currencyFormat";
import {
  calculateDaysDifference,
  formatDateToStringType1,
  formatDateToStringType2,
  formatDateToStringType3,
} from "@/lib/dateFormat";
import { useBookingStore } from "@/stores/booking.store";
import { useUserStore } from "@/stores/user.store";
import { PickupLocation } from "@/types/contact.type";
import { Calendar, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const {
    selectedCar,
    pickupDate,
    returnDate,
    pickupLocation,
    setBookingStep,
  } = useBookingStore();
  const { user } = useUserStore();

  const router = useRouter();

  const [rentalFee, setRentalFee] = React.useState(0);

  useEffect(() => {
    setRentalFee(
      calculatorRentalFee(
        selectedCar?.pricePerDay || 0,
        calculateDaysDifference(new Date(pickupDate!), new Date(returnDate!))
      )
    );
  }, [selectedCar]);

  const handleConfirm = () => {
    setBookingStep(2);
    // setTotalRent(rentalFee + calculatorVAT(rentalFee));
    router.push(`/booking/${selectedCar?.id}/payment`);
  };
  return (
    <div className="flex flex-col w-full my-6">
      <h1 className="text-left w-full text-2xl font-semibold">
        Thông tin hợp đồng
      </h1>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex gap-4 items-center">
          <Calendar className="text-blue-500" width={34} height={34} />
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm font-semibold">
              Thời gian thuê
            </p>
            <p className="font-medium text-base">
              {formatDateToStringType2(pickupDate || new Date())} đến{" "}
              {formatDateToStringType2(returnDate || new Date())}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <MapPin className="text-blue-500" width={34} height={34} />
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm font-semibold">
              Nhận xe tại vị trí
            </p>
            {pickupLocation === PickupLocation.CAR_LOCATION ? (
              <p className="font-medium text-base">
                {selectedCar?.location.district}, {selectedCar?.location.city}
              </p>
            ) : (
              <p className="font-medium text-base">
                {user?.addresses?.at(0)?.street},{" "}
                {user?.addresses?.at(0)?.district},{" "}
                {user?.addresses?.at(0)?.ward}, {user?.addresses?.at(0)?.city}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 ">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Phí thuê xe:</span>
          <span>{formatCurrency(rentalFee)}</span>
        </div>
        <Separator />
      </div>
      {/* <div className="mt-6">
        <div className="font-semibold mb-4">Giảm giá</div>
        <div className="flex justify-between mb-4">
          <span className="">Khuyến mãi:</span>
          <span className="text-red-500">-450.000 đ</span>
        </div>
        <Separator />
      </div> */}
      <div className="mt-6 ">
        <div className="flex justify-between mb-6">
          <span className="font-semibold">Thuế VAT:</span>
          <span>{formatCurrency(calculatorVAT(rentalFee))}</span>
        </div>
        <div className="flex justify-between mb-6">
          <span className="font-semibold">Tổng cộng tiền thuê:</span>
          <span>{formatCurrency(rentalFee + calculatorVAT(rentalFee))}</span>
        </div>
        <div className="mb-6">
          <div className="flex justify-between ">
            <span className="font-semibold">Tiền cọc:</span>
            <span>500.000 VND</span>
          </div>
          <span className="text-sm">
            Tiền cọc sẽ không được hoàn lại nếu hủy chuyến.
          </span>
        </div>
        <div className="mb-6">
          <div className="flex justify-between ">
            <span className="font-semibold">Tài sản thế chấp:</span>
            <span>5.000.000 VND</span>
          </div>
          <span className="text-sm">
            Thanh toán sau khi nhận và kiểm tra xe, không nhận cọc xe máy.
          </span>
        </div>
      </div>
      <Button className="bg-blue-500 hover:bg-blue-300" onClick={handleConfirm}>
        Xác nhận
      </Button>
    </div>
  );
}
