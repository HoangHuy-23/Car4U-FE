"use client";
import { formatCurrency } from "@/lib/currencyFormat";
import { formatDateToStringType2 } from "@/lib/dateFormat";
import { useBookingStore } from "@/stores/booking.store";
import { PickupLocation } from "@/types/contact.type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  isSuccess: boolean;
};

export default function BookingSuccess({ isSuccess }: Props) {
  const router = useRouter();
  const { contact, selectedCar, owner, fetchOwner } = useBookingStore();
  const { renter } = contact || {};
  useEffect(() => {
    if (owner === null) {
      fetchOwner(contact?.car?.id as string);
    }
  }, []);
  return (
    <div className={`${isSuccess ? "flex" : "hidden"} flex-col w-full`}>
      <h1 className="text-left w-full text-2xl font-semibold">Cám ơn bạn!</h1>
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl font-medium">Thông tin đơn thuê</h1>
        <img
          src={selectedCar?.images.at(0)}
          alt=""
          className="w-[70%] rounded-md"
        />
        <div className="w-full gap-2 flex flex-col">
          <p className="text-lg font-medium text-left w-full">Người thuê</p>
          <div className="w-full flex justify-between">
            <p>Họ và tên:</p>
            <p>{contact?.renter?.name}</p>
          </div>
          <div className="w-full flex justify-between">
            <p>Số điện thoại:</p>
            <p>{contact?.renter?.phone}</p>
          </div>
        </div>
        <div className="w-full gap-2 flex flex-col">
          <p className="text-lg font-medium text-left w-full">Chủ xe</p>
          <div className="w-full flex justify-between">
            <p>Họ và tên:</p>
            <p>{owner?.name}</p>
          </div>
          <div className="w-full flex justify-between">
            <p>Số điện thoại:</p>
            <p>{owner?.phone}</p>
          </div>
        </div>
        <div className="w-full gap-2 flex flex-col">
          <p className="text-lg font-medium text-left w-full">Hợp đồng</p>
          <div className="w-full flex justify-between">
            <p>Thời gian lập hợp đồng</p>
            <p>
              {formatDateToStringType2(
                new Date(contact?.createdAt as unknown as string)
              )}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p>Loại xe</p>
            <p>
              {selectedCar?.brand} {selectedCar?.model} {selectedCar?.year}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p>Ngày nhận:</p>
            <p>
              {formatDateToStringType2(
                new Date(contact?.pickupDate as unknown as string)
              )}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p>Ngày trả:</p>
            <p>
              {formatDateToStringType2(
                new Date(contact?.returnDate as unknown as string)
              )}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p>Vị trí nhận xe:</p>
            {contact?.pickupLocation === PickupLocation.CAR_LOCATION ? (
              <p className="">
                {selectedCar?.location.district}, {selectedCar?.location.city}
              </p>
            ) : (
              <p className="">
                {renter?.addresses?.at(0)?.street},{" "}
                {renter?.addresses?.at(0)?.district},{" "}
                {renter?.addresses?.at(0)?.ward},{" "}
                {renter?.addresses?.at(0)?.city}
              </p>
            )}
          </div>
        </div>
        <div className="w-full ">
          <div className="flex justify-between ">
            <span className="font-semibold">Tiền cọc:</span>
            <span>500.000 đ</span>
          </div>
          <span className="text-sm">
            Tiền cọc sẽ không được hoàn lại nếu hủy chuyến. Tiền cọc sẽ được
            hoàn lại khi trả xe.
          </span>
        </div>
        <div className="w-full ">
          <div className="flex justify-between ">
            <span className="font-semibold">Tổng cộng tiền thuê xe:</span>
            <span>{formatCurrency(contact?.totalFee || 0)} đ</span>
          </div>
          <span className="text-sm">Thu khi nhận xe.</span>
        </div>
      </div>

      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => {
          router.push("/");
          // dispatch(resetBookingState());
        }}
      >
        Trang chủ
      </button>
    </div>
  );
}
