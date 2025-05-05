import { Car } from "@/types/car.type";
import { Dot, Heart, Luggage, Share, Star } from "lucide-react";
import React from "react";

type Props = {
  data: Car | null;
  isLoading: boolean;
  isError: boolean;
};

export default function CarInfo({ data, isLoading, isError }: Props) {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold font-sans">
          {data?.brand} {data?.model} {data?.year}
        </h1>
        <div className="flex gap-1">
          <div className="border rounded-full px-2 py-2 flex items-center justify-center">
            <Share />
          </div>
          <div className="border rounded-full px-2 py-2 flex items-center justify-center">
            <Heart />
          </div>
        </div>
      </div>
      <div className="flex justify-start">
        <span className="text-sm flex justify-center items-center">
          <Star
            className="float-start text-yellow-500"
            width={20}
            height={20}
          />
          {data?.rating}
        </span>
        <Dot />
        <span className="text-sm flex justify-center items-center">
          <Luggage
            className="float-start text-blue-500"
            width={20}
            height={20}
          />{" "}
          {data?.numOfTrips} chuyến
        </span>
        <Dot />
        <span>
          {data?.location?.district}, {data?.location?.city}
        </span>
      </div>
      <div id="card-content" className="flex gap-2 my-2">
        <div className="bg-green-100 rounded-full flex items-center justify-center text-sm h-6 px-2">
          {data?.transmissionType === "MANUAL" ? "Số sàn" : "Số tự động"}
        </div>
        {data?.deliveryPolicy.allowDelivery && (
          <span className="bg-blue-100 rounded-full flex items-center justify-center text-sm h-6 px-2">
            Giao xe tận nơi
          </span>
        )}
        {!data?.collateralRequired && (
          <span className="bg-orange-100 rounded-full flex items-center justify-center text-sm h-6 px-2">
            Miễn thế chấp
          </span>
        )}
      </div>
    </div>
  );
}
