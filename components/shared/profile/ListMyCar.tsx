"use client";
import { useUserStore } from "@/stores/user.store";
import React, { useEffect } from "react";
import { CarCard } from "../searchpage/CarCard";

type Props = {};

const ListMyCar = (props: Props) => {
  const { myCars, getMyCars } = useUserStore();
  useEffect(() => {
    getMyCars();
  }, [getMyCars]);
  return (
    <div className="mt-5">
      {/* <h1 className="text-2xl font-bold mb-4">Xe nổi bật</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {myCars &&
          myCars.length > 0 &&
          myCars.map((car, index) => (
            <CarCard
              key={index}
              id={car.id}
              name={car.name}
              image={car.images[0]}
              price={car.pricePerDay}
              fuel={car.fuelType}
              location={car.location.district}
              seats={car.numOfSeats}
              rating={car.rating}
              trips={car.numOfTrips}
              status={car.status}
              transmission={car.transmissionType}
              isLiked={
                myCars?.some((likedCar) => likedCar.id === car.id) ?? false
              }
              isMyCarItem={true} // Indicating this is a car from the user's own list
            />
          ))}
        {myCars && myCars.length === 0 && (
          <div className="col-span-4 text-center text-gray-500">
            Bạn chưa có xe nào. Hãy thêm xe vào danh sách của bạn!
          </div>
        )}
      </div>
    </div>
  );
};

export default ListMyCar;
