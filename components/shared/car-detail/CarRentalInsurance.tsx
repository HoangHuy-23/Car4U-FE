import { ShieldCheck } from "lucide-react";
import React from "react";

export default function CarRentalInsurance() {
  return (
    <div className="border rounded-md flex gap-2 items-start p-2">
      <ShieldCheck width={40} height={40} className="text-blue-500 align-top" />
      <div>
        <h1 className="text-primary font-semibold">Bảo hiểm thuê xe</h1>
        <p className="text-sm text-gray-500">
          Chuyến đi có mua bảo hiểm. Khách thuê bồi thường tối đa 2.000.000 VNĐ
          trong trường hợp có sự cố ngoài ý muốn.
        </p>
        <p className="text-sm font-semibold">Xem chi tiết</p>
      </div>
    </div>
  );
}
