"use client";
import { CarCard } from "@/components/shared/searchpage/CarCard";
import { CarFilters } from "@/components/shared/searchpage/CarFilter";
import SearchFilter from "@/components/shared/searchpage/SearchFilter";
import axiosClient from "@/lib/axiosClient";
import { Car } from "@/types/car.type";
import React, { useEffect, useState } from "react";

const cars = [
  {
    name: "Mitsubishi Mirage 2017",
    image:
      "https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_mirage_2017/p/g/2024/00/17/07/Nv1CN5NQm87HB0_pYWVCWA.jpg",
    price: "359K",
    location: "Quận 1, TP. HCM",
    seats: 5,
    fuel: "Xăng",
    transmission: "Số sàn",
    discount: 25,
    rating: 5,
    trips: 100,
  },
  {
    name: "Suzuki Ertiga 2017",
    image:
      "https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/suzuki_ertiga_2017/p/g/2019/06/24/13/tO71Or6A9yVqtNX9q0TEUQ.jpg",
    price: "649K",
    location: "Quận 4, TP. HCM",
    seats: 7,
    fuel: "Xăng",
    transmission: "Số tự động",
    discount: 18,
    rating: 5,
    trips: 99,
  },
  // Add more cars...
  {
    name: "Mitsubishi Mirage 2017",
    image:
      "https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_mirage_2017/p/g/2024/00/17/07/Nv1CN5NQm87HB0_pYWVCWA.jpg",
    price: "359K",
    location: "Quận 1, TP. HCM",
    seats: 5,
    fuel: "Xăng",
    transmission: "Số sàn",
    discount: 25,
    rating: 5,
    trips: 100,
  },
  {
    name: "Suzuki Ertiga 2017",
    image:
      "https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/suzuki_ertiga_2017/p/g/2019/06/24/13/tO71Or6A9yVqtNX9q0TEUQ.jpg",
    price: "649K",
    location: "Quận 4, TP. HCM",
    seats: 7,
    fuel: "Xăng",
    transmission: "Số tự động",
    discount: 18,
    rating: 5,
    trips: 99,
  },
  {
    name: "Mitsubishi Mirage 2017",
    image:
      "https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_mirage_2017/p/g/2024/00/17/07/Nv1CN5NQm87HB0_pYWVCWA.jpg",
    price: "359K",
    location: "Quận 1, TP. HCM",
    seats: 5,
    fuel: "Xăng",
    transmission: "Số sàn",
    discount: 25,
    rating: 5,
    trips: 100,
  },
  {
    name: "Suzuki Ertiga 2017",
    image:
      "https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/suzuki_ertiga_2017/p/g/2019/06/24/13/tO71Or6A9yVqtNX9q0TEUQ.jpg",
    price: "649K",
    location: "Quận 4, TP. HCM",
    seats: 7,
    fuel: "Xăng",
    transmission: "Số tự động",
    discount: 18,
    rating: 5,
    trips: 99,
  },
  {
    name: "Mitsubishi Mirage 2017",
    image:
      "https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/mitsubishi_mirage_2017/p/g/2024/00/17/07/Nv1CN5NQm87HB0_pYWVCWA.jpg",
    price: "359K",
    location: "Quận 1, TP. HCM",
    seats: 5,
    fuel: "Xăng",
    transmission: "Số sàn",
    discount: 25,
    rating: 5,
    trips: 100,
  },
  {
    name: "Suzuki Ertiga 2017",
    image:
      "https://n1-pstg-org.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/suzuki_ertiga_2017/p/g/2019/06/24/13/tO71Or6A9yVqtNX9q0TEUQ.jpg",
    price: "649K",
    location: "Quận 4, TP. HCM",
    seats: 7,
    fuel: "Xăng",
    transmission: "Số tự động",
    discount: 18,
    rating: 5,
    trips: 99,
  },
];

type Props = {};

const SearchPage = (props: Props) => {
  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    // Fetch cars from API or use static data
    const fetchCars = async () => {
      const response = await axiosClient.get(
        "/cars/filter?pageNo=1&location=hanoi"
      );
      const data = response.data.data.data;
      // Assuming the API returns an array of cars
      setCars(data);
    };
    // For now, we are using static data
    fetchCars();
  }, []);
  return (
    <>
      <SearchFilter />
      {/* <CarFilters /> */}
      <div className="container mx-auto px-4">
        <div className="mt-5">
          {/* <h1 className="text-2xl font-bold mb-4">Xe nổi bật</h1> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cars &&
              cars.length > 0 &&
              cars.map((car, index) => (
                <CarCard
                  key={index}
                  name={car.name}
                  image={car.images[0]}
                  price={car.pricePerDay.toString()}
                  fuel={car.fuelType}
                  location={car.location.district}
                  seats={car.numOfSeats}
                  rating={car.rating}
                  trips={car.numOfTrips}
                  transmission={car.transmissionType}
                />
              ))}
            {cars.length === 0 && (
              <div className="col-span-4 text-center text-gray-500">
                No car is suitable for your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
