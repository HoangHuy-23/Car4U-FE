"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { formatCurrency } from "@/lib/currencyFormat";
import { Car } from "@/types/car.type";
import { User } from "@/types/user.type";
import { RentalContact } from "@/types/contact.type";

interface RentalContactCardProps {
  data: RentalContact;
}

export const RentalContactCard = ({ data }: RentalContactCardProps) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex items-start gap-4">
        <img
          src={data.car?.images?.[0] || ""}
          alt={data.car?.name || ""}
          className="w-32 h-24 object-cover rounded"
        />
        <div className="flex-1">
          <CardTitle className="text-lg font-bold">{data.car?.name}</CardTitle>
          <div className="text-sm text-muted-foreground">
            Tạo lúc:{" "}
            {format(new Date(data.createdAt || ""), "dd/MM/yyyy HH:mm", {
              locale: vi,
            })}
          </div>
          <Badge variant="outline" className="mt-1">
            {statusLabel(data.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="font-medium">Người thuê:</div>
          <div>{data.renter?.name}</div>
        </div>
        <div>
          <div className="font-medium">Chủ xe:</div>
          <div>{data.owner?.name}</div>
        </div>
        <div>
          <div className="font-medium">Thời gian thuê:</div>
          <div>
            {format(new Date(data.pickupDate || ""), "dd/MM/yyyy HH:mm", {
              locale: vi,
            })}{" "}
            →{" "}
            {format(new Date(data.returnDate || ""), "dd/MM/yyyy HH:mm", {
              locale: vi,
            })}
          </div>
        </div>
        <div>
          <div className="font-medium">Điểm nhận xe:</div>
          <div>{data.pickupLocation}</div>
        </div>
        <div>
          <div className="font-medium">Phí thuê:</div>
          <div>{formatCurrency(data.rentalFee)}</div>
        </div>
        <div>
          <div className="font-medium">VAT:</div>
          <div>{formatCurrency(data.vat)}</div>
        </div>
        <div>
          <div className="font-medium">Tổng phí:</div>
          <div className="text-primary font-semibold">
            {formatCurrency(data.totalFee)}
          </div>
        </div>
        <div>
          <div className="font-medium">Tiền cọc:</div>
          <div>{formatCurrency(data.depositFee)}</div>
        </div>
        <div>
          <div className="font-medium">Tiền thế chấp:</div>
          <div>{formatCurrency(data.collateralAmount || 0)}</div>
        </div>
      </CardContent>
    </Card>
  );
};

// ✅ Hàm format trạng thái đẹp hơn
function statusLabel(status: string) {
  switch (status) {
    case "PENDING":
      return "Chờ xử lý";
    case "ACCEPTED":
      return "Đã chấp nhận";
    case "CANCELLED":
      return "Đã hủy";
    case "COMPLETED":
      return "Hoàn thành";
    case "REJECTED":
      return "Từ chối";
    default:
      return status;
  }
}
