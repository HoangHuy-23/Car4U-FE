"use client";
import { Button } from "@/components/ui/button";
import { useCarDetailStore } from "@/stores/carDetail.store";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import CarImage from "./CarImage";
import CarInfo from "./CarInfo";
import { Separator } from "@/components/ui/separator";
import CarCharacteristics from "./CarCharacteristics";
import CarDescription from "./CarDescription";
import CarRentalDocuments from "./CarRentalDocuments";
import Collateral from "./Collateral";
import CarLocation from "./CarLocation";
import CarRentalInsurance from "./CarRentalInsurance";
import RentalInformation from "./RentalInformation";
import { useBookingStore } from "@/stores/booking.store";
import { useSearchStore } from "@/stores/search.store";
import CarOwner from "./CarOwner";

type Props = {
  carId: string;
};

export default function CarDetail({ carId }: Props) {
  const { car, getCar, isLoading } = useCarDetailStore();
  const { location, pickupDate, returnDate } = useSearchStore();
  const router = useRouter();
  const { setSelectedCar, setPickupDate, setReturnDate, setLocation } =
    useBookingStore();

  useEffect(() => {
    const fetchCar = async () => {
      await getCar(carId);
    };
    fetchCar();
  }, [carId]);

  useEffect(() => {
    if (car) {
      setSelectedCar(car);
      setPickupDate(pickupDate);
      setReturnDate(returnDate);
      setLocation(location);
    }
  }, [carId]);

  return (
    <div className="container mx-auto p-4">
      {/* btn back */}
      <Button
        className="bg-white hover:bg-slate-50 text-blue-500 mb-8"
        onClick={() => {
          setSelectedCar(null);
          router.back();
        }}
      >
        <ChevronLeft /> Trở về
      </Button>
      {/* car images */}
      <CarImage data={car} isLoading={isLoading} isError={false} />
      {/* car info */}
      <div className="grid lg:grid-cols-[4fr_2fr] grid-cols-1 mb-8 mt-4 gap-4">
        {/* left */}
        <div className="flex flex-col gap-8">
          <CarInfo data={car} isLoading={isLoading} isError={false} />
          <Separator />
          <CarCharacteristics
            data={car}
            isLoading={isLoading}
            isError={false}
          />
          <Separator />
          <CarDescription data={car} isLoading={isLoading} isError={false} />
          <Separator />
          <CarRentalDocuments />
          <Separator />
          <Collateral data={car} isLoading={isLoading} isError={false} />
          <Separator />
          <CarLocation data={car} isLoading={isLoading} isError={false} />
        </div>
        {/* right */}
        <div className="flex flex-col mt-4 gap-8">
          {/* bao hiem */}
          <CarRentalInsurance />
          {/* rent box */}
          <RentalInformation data={car} isLoading={isLoading} isError={false} />
        </div>
      </div>
      <div className="grid lg:grid-cols-[4fr_2fr] grid-cols-1 mb-8 mt-4 gap-4">
        <div>
          <Separator className="mb-6" />
          <CarOwner carId={carId} />
        </div>
      </div>
    </div>
  );
}
