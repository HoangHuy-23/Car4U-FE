import { UserRound } from "lucide-react";
import Image from "next/image";
import React from "react";
import seat from "@/public/seat.png";
import transmission from "@/public/transmission.png";
import fuel from "@/public/fuel.png";
import consumption from "@/public/consumption.png";
import { Car } from "@/types/car.type";
import { enumFormat, formatFuelTypeToVN } from "@/lib/enumFormat";

type Props = {
  data: Car | null;
  isLoading: boolean;
  isError: boolean;
};

export default function CarCharacteristics({
  data,
  isLoading,
  isError,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Đặc điểm</h1>
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <Image src={seat} alt="" width={40} height={40} />
          <div className="flex flex-col">
            <span>Số ghế</span>
            <span>{data?.numOfSeats} chỗ</span>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Image src={transmission} alt="" width={40} height={40} />
          <div className="flex flex-col">
            <span>Dẫn truyền</span>
            <span>
              {data?.transmissionType === "MANUAL" ? "Số sàn" : "Số tự động"}
            </span>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Image src={fuel} alt="" width={40} height={40} />
          <div className="flex flex-col">
            <span>Nhiên liệu</span>
            <span>{formatFuelTypeToVN(data?.fuelType ?? "")}</span>
          </div>
        </div>
        {data?.fuelConsumption && (
          <div className="flex gap-4 items-center">
            <Image src={consumption} alt="" width={40} height={40} />
            <div className="flex flex-col">
              <span>NL tiêu thụ</span>
              {data?.fuelType === "ELECTRIC" ? (
                <span>{data?.fuelConsumption} km/1 lần sạc</span>
              ) : (
                <span>{data?.fuelConsumption} lit/100km</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
