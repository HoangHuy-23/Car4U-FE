import { useUserStore } from "@/stores/user.store";
import React from "react";
import { CarCard } from "../searchpage/CarCard";

type Props = {};

const ListMyFavoriteCars = (props: Props) => {
  const { likedCars } = useUserStore();
  return (
    <div className="mt-5">
      {/* <h1 className="text-2xl font-bold mb-4">Xe nổi bật</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {likedCars &&
          likedCars.length > 0 &&
          likedCars.map((car, index) => (
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
              transmission={car.transmissionType}
              isLiked={
                likedCars?.some((likedCar) => likedCar.id === car.id) ?? false
              }
            />
          ))}
        {likedCars && likedCars.length === 0 && (
          <div className="col-span-4 text-center text-gray-500">
            Bạn chưa có xe yêu thích nào. Hãy thêm xe vào danh sách yêu thích của bạn!
          </div>
        )}
      </div>
    </div>
  );
};

export default ListMyFavoriteCars;
