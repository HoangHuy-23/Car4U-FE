"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCarDetailStore } from "@/stores/carDetail.store";
import { Dot, Luggage, Star } from "lucide-react";
import React, { useEffect } from "react";

type Props = {
  carId: string;
};

export default function CarOwner({ carId }: Props) {
  const { owner, getOwner } = useCarDetailStore();
  useEffect(() => {
    getOwner(carId);
  }, [carId]);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Chủ xe</h1>
      <div className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <Avatar className="w-14 h-14">
            <AvatarFallback className="bg-blue-500 text-white text-2xl font-semibold">
              {owner?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
            <AvatarImage
              src={owner?.avatar ?? ""}
              alt="Avatar Image"
              className="rounded-full w-14 h-14"
            />
          </Avatar>
          <div className="">
            <h1 className="text-xl font-semibold">{owner?.name}</h1>
            <div className="flex">
              <span className="text-sm flex justify-center items-center">
                <Star
                  className="float-start text-yellow-500"
                  width={14}
                  height={14}
                />
                {owner?.rating}
              </span>
              <Dot />
              <span className="text-sm flex justify-center items-center">
                <Luggage
                  className="float-start text-blue-500"
                  width={14}
                  height={14}
                />{" "}
                {owner?.numOfTrips} chuyến
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-gray-500">Tỉ lệ phản hồi</h1>
            <h1>100%</h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-gray-500">Thời gian phản hồi</h1>
            <h1>5 phút</h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-gray-500">Tỉ lệ đòng ý</h1>
            <h1>100%</h1>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-600 bg-blue-200 rounded-md p-2">
        Chủ xe 5* có thời gian phản hồi nhanh chóng, tỉ lệ đồng ý cao, mức giá
        cạnh tranh & dịch vụ nhận được nhiều đánh giá tốt từ khách hàng.
      </div>
    </div>
  );
}
