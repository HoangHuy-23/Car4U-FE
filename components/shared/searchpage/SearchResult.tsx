"use client";
import { useSearchStore } from "@/stores/search.store";
import { useEffect, useRef } from "react";
import { CarCard } from "./CarCard";
import { useUserStore } from "@/stores/user.store";

type Props = {};

const SearchResult = (props: Props) => {
  const {
    pageNo,
    setPageNo,
    searchResults,
    fetchSearchResults,
    isLoading,
    hasMore,
  } = useSearchStore();

  const { likedCars } = useUserStore();

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSearchResults();
  }, [pageNo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setPageNo(pageNo + 1); // Increment pageNo directly
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, hasMore, setPageNo]); // Cập nhật thêm dependencies

  return (
    <div className="container mx-auto px-4">
      <div className="mt-5">
        {/* <h1 className="text-2xl font-bold mb-4">Xe nổi bật</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults &&
            searchResults.length > 0 &&
            searchResults.map((car, index) => (
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
          {searchResults.length === 0 && !isLoading && (
            <div className="col-span-4 text-center text-gray-500">
              Không có kết quả tìm kiếm nào phù hợp.
            </div>
          )}
          {isLoading && (
            <div className="col-span-4 text-center text-gray-500">
              Đang tải kết quả tìm kiếm...
            </div>
          )}
        </div>
        <div ref={loaderRef} className="h-10" />
      </div>
    </div>
  );
};

export default SearchResult;
