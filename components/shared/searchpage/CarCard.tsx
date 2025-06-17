"use client";
import { Heart, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { formatCurrency } from "@/lib/currencyFormat";
import {
  enumFormat,
  formatFuelTypeToVN,
  formatTransmissionTypeToVN,
} from "@/lib/enumFormat";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/stores/booking.store";
import { useUserStore } from "@/stores/user.store";
import { useEffect, useState } from "react";

interface CarCardProps {
  id: string;
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
  isLiked?: boolean; // Optional prop for liked status
}

export const CarCard = ({
  id,
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
  isLiked = false, // Default to false if not provided
}: CarCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/cars/${id}`); // Navigate to the car detail page
  };
  const { likeCar, unlikeCar } = useUserStore();
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from propagating to the card
    if (isLiked) {
      unlikeCar(id);
    } else {
      likeCar(id);
    }
  };
  return (
    <Card
      className="w-full gap-0 py-0 max-w-xs shadow hover:shadow-lg transition cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader className="relative p-0">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        {discount && (
          <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
            Giảm {discount}%
          </Badge>
        )}
        <div
          className="absolute top-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from propagating to the card
            handleLikeClick(e);
          }}
        >
          <Heart
            size={16}
            className={`text-gray-500 ${isLiked && "text-red-500 fill-current"}`}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="text-sm text-gray-500">{location}</div>
        <div className="text-sm text-gray-500">
          {seats} chỗ · {formatTransmissionTypeToVN(transmission)} ·{" "}
          {formatFuelTypeToVN(fuel)}
        </div>
        <div className="text-primary font-semibold text-lg">
          {formatCurrency(price)}/ngày
        </div>
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <Star size={14} className="fill-current" />
          <span>
            {rating} · {trips} chuyến
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
