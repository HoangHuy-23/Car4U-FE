"use client";
import { addHoursAndRoundMinutes } from "@/lib/dateFormat";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchLocationInput from "./SearchLocationInput";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import SearchDateInput from "./SearchDateInput";
import { useSearchStore } from "@/stores/search.store";

type Props = {};

const SearchBar = (props: Props) => {
  let now = new Date();
  now = addHoursAndRoundMinutes(now, 2);
  let tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const router = useRouter();

  // const [location, setLocation] = useState<string>("saigon");
  // const [pickupDate, setPickupDate] = useState<Date>(now);
  // const [returnDate, setReturnDate] = useState<Date>(tomorrow);

  const [errorLocation, setErrorLocation] = useState<boolean>(false);
  const [errorPickupDate, setErrorPickupDate] = useState<boolean>(false);
  const [errorReturnDate, setErrorReturnDate] = useState<boolean>(false);

  const {
    location,
    setLocation,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  } = useSearchStore();

  useEffect(() => {
    now = new Date();
    now = addHoursAndRoundMinutes(now, 2);
    tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    setPickupDate(now);
    setReturnDate(tomorrow);
    setLocation("hanoi");
  }, []);

  const revalidateForm = () => {
    if (location === "") {
      setErrorLocation(true);
      return false;
    }
    const pickupDateTime = new Date(pickupDate ?? new Date());
    const returnDateTime = new Date(returnDate ?? new Date());
    const today = new Date();
    if (pickupDateTime < today) {
      setErrorPickupDate(true);
      return false;
    }
    if (
      returnDateTime.getTime() -
        pickupDateTime.getTime() / (1000 * 60 * 60 * 24) <
      1
    ) {
      setErrorReturnDate(true);
      return false;
    }
    return true;
  };
  const handleSearch = () => {
    const isValid = revalidateForm();
    if (isValid) {
      router.push(
        `/search?location=${location}&pickupDate=${pickupDate!.toISOString()}&returnDate=${returnDate!.toISOString()}`
      );
    } else {
      toast.warning("Please choose location!", {
        duration: 3000,
      });
    }
  };
  return (
    <div>
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 px-2">
        <h1 className="text-5xl font-bold tracking-tighter text-primary">
          Hãy bắt đầu hành trình của bạn với Car4U
        </h1>
        <span className="text-xl">Một chuyến đi tuyệt vời đang đến!</span>

        <form
          className="flex items-center justify-center max-md:flex-col w-full relative max-sm:gap-4 gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col justify-center items-center max-md:w-full">
            <label
              htmlFor="pickUpDate"
              className="text-gray-500 font-semibold text-sm ml-2 self-start"
            >
              Địa điểm
            </label>
            <SearchLocationInput
              location={location}
              setLocation={setLocation}
              isEmpty={errorLocation}
              setIsEmpty={setErrorLocation}
            />
          </div>
          <div className="flex flex-col justify-center items-center max-md:w-full">
            <label
              htmlFor="pickUpDate"
              className="text-gray-500 font-semibold text-sm ml-2 self-start"
            >
              Ngày nhận xe
            </label>
            <SearchDateInput
              pickupDate={pickupDate ?? new Date()}
              setPickupDate={setPickupDate}
              returnDate={returnDate ?? new Date()}
              setReturnDate={setReturnDate}
              isPick={true}
            />
          </div>
          <div className="flex flex-col justify-center items-center max-md:w-full">
            <label
              htmlFor="pickupDate"
              className="text-gray-500 font-semibold text-sm ml-2 self-start"
            >
              Ngày trả xe
            </label>
            <SearchDateInput
              pickupDate={pickupDate ?? new Date()}
              setPickupDate={setPickupDate}
              returnDate={returnDate ?? new Date()}
              setReturnDate={setReturnDate}
              isPick={false}
            />
          </div>
          <Button
            type="submit"
            className="bg-primary rounded-lg hover:bg-primary/30 mt-5 h-[40px]"
          >
            Tìm kiếm
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
