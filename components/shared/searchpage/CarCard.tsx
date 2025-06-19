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
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CarStatus } from "@/types/car.type";

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
  status?: CarStatus; // Optional prop for car status
  isLiked?: boolean; // Optional prop for liked status
  isMyCarItem?: boolean; // Optional prop for distinguishing my car items
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
  status,
  isLiked = false, // Default to false if not provided
  isMyCarItem = false, // Default to false if not provided
}: CarCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    if (isMyCarItem) {
      // If it's a car from the user's own list, navigate to the edit page
      // router.push(`/cars/edit/${id}`);
      return;
    }
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
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    // Set the initial state of the switch based on the car status
    console.log("Car status:", status);
    if (status?.toString() == "AVAILABLE") {
      setEnabled(true);
    } else if (status?.toString() == "UNAVAILABLE") {
      setEnabled(false);
    }
  }, [status, isMyCarItem]);
  const { disableCar, enableCar } = useUserStore();
  const handleSwitchChange = (checked: boolean) => {
    setEnabled(checked);
    // Here you can add logic to update the car status in the backend
    if (checked) {
      // If the switch is turned on, set the car status to AVAILABLE
      enableCar(id);
      console.log(`Car ${id} is now AVAILABLE`);
      // Call your API to update the car status to AVAILABLE
    } else {
      // If the switch is turned off, set the car status to UNAVAILABLE
      disableCar(id);
      console.log(`Car ${id} is now UNAVAILABLE`);
      // Call your API to update the car status to UNAVAILABLE
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
        {isMyCarItem ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="absolute top-2 right-2 bg-opacity-80 z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Switch
                    checked={enabled}
                    onCheckedChange={handleSwitchChange}
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="z-50">
                <span>{enabled ? "Hoạt động" : "Ngừng hoạt động"}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div
            className="absolute top-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from propagating to the card
              handleLikeClick(e);
            }}
          >
            <Heart
              size={16}
              className={`text-gray-500 ${
                isLiked && "text-red-500 fill-current"
              }`}
            />
          </div>
        )}
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
