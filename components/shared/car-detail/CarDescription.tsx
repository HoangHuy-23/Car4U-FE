import { Car } from "@/types/car.type";
import React from "react";

type Props = {
  data: Car | null;
  isLoading: boolean;
  isError: boolean;
};
export default function CarDescription({ data, isLoading, isError }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Mô tả</h1>
      <div>
        <p>{data?.description}</p>
      </div>
    </div>
  );
}
