import { CreditCard } from "lucide-react";
import React from "react";

export default function CarRentalDocuments() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Giấy tờ thuê xe</h1>
      <div className="bg-blue-100 rounded-md p-4 gap-4 flex flex-col relative">
        <div className="absolute bg-blue-500 w-2 rounded-l-md h-full top-0 left-0"></div>
        <div>Chọn 1 trong 2 hình thức</div>
        <div className="flex gap-2">
          <CreditCard />
          <span>GPLX & CCCD</span>
        </div>
        <div className="flex gap-2">
          <CreditCard />
          <span>GPLX & CCCD</span>
        </div>
      </div>
    </div>
  );
}
