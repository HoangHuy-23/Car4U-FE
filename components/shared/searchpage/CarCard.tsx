// components/CarCard.tsx

import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { formatCurrency } from "@/lib/currencyFormat";

interface CarCardProps {
  name: string;
  image: string;
  price: number;
  location: string;
  seats: number;
  fuel: string;
  transmission: string;
  discount?: number;
  rating: number;
  trips: number;
}

export const CarCard = ({
  name,
  image,
  price,
  location,
  seats,
  fuel,
  transmission,
  discount,
  rating,
  trips,
}: CarCardProps) => {
  return (
    <Card className="w-full gap-0 py-0 max-w-xs shadow hover:shadow-lg transition">
      <CardHeader className="relative p-0">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        {discount && (
          <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
            Discount {discount}%
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 space-y-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="text-sm text-gray-500">{location}</div>
        <div className="text-sm text-gray-500">
          {seats} seats · {transmission} · {fuel}
        </div>
        <div className="text-green-600 font-semibold text-lg">{formatCurrency(price)}/day</div>
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <Star size={14} className="fill-current" />
          {rating} · {trips} trip
        </div>
      </CardContent>
    </Card>
  );
};
