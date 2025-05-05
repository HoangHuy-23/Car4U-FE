"use client";
import { ChevronLeftCircle, RefreshCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdvancedFilterDialog } from "../dialog/AdvancedFilterDialog";
import { FilterBrandDialog } from "../dialog/FilterBrandDialog";
import { FilterCarTypeDialog } from "../dialog/FilterCarTypeDialog";
import { FilterDateDialog } from "../dialog/FilterDateDialog";
import { FilterLocationDialog } from "../dialog/FilterLocationDialog";
import { useSearchStore } from "@/stores/search.store";

type Props = {};

const SearchFilter = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pickupDateStr = searchParams.get("pickupDate");
  const returnDateStr = searchParams.get("returnDate");

  const [pickup, setPickup] = useState<Date | null>(null);
  const [returned, setReturned] = useState<Date | null>(null);

  const {
    setCarType,
    setBrand,
    setFeatures,
    setFuelConsumption,
    setTransmissionType,
    setFuelType,
    setPageNo,
    setYear,
    setSeat,
    setPrice,
    setSortBy,
    fetchSearchResults,
  } = useSearchStore();
  useEffect(() => {
    if (pickupDateStr) {
      setPickup(new Date(pickupDateStr));
    }
    if (returnDateStr) {
      setReturned(new Date(returnDateStr));
    }
  }, [pickupDateStr, returnDateStr]);

  const handleResetFilters = () => {
    setCarType("ALL");
    setBrand("ALL");
    setFeatures([]);
    setFuelConsumption([0]);
    setTransmissionType("ALL");
    setFuelType("ALL");
    setPageNo(1);
    setYear([0]);
    setSeat([2, 16]);
    setPrice([0, 10000000]);
    setSortBy("DEFAULT");
    fetchSearchResults();
  };
  return (
    <div className="sticky py-4 bg-white shadow-md top-16 z-40 w-full border-b">
      <div className="container mx-auto px-4 justify-between items-center">
        {/* location and time */}
        <div className="flex justify-start items-center gap-4 mb-4">
          <button
            className="p-0"
            // variant={"link"}
            onClick={() => router.back()}
          >
            <ChevronLeftCircle size={40} className="text-foreground size-5" />
          </button>
          <FilterLocationDialog />
          <FilterDateDialog />
          {/* <SearchDateInput isPick={false} pickupDate={pickup || new Date} returnDate={returned || new Date} setPickupDate={setPickup} setReturnDate={setReturned}/> */}
        </div>
        {/* scroll bar option filter */}
        <div className="flex justify-start items-center gap-4 mb-4">
          <button
            className="p-0"
            // variant={"link"}
            onClick={() => handleResetFilters()}
          >
            <RefreshCcw size={40} className="text-foreground size-5" />
          </button>
          <div className="flex w-full justify-between items-center overflow-x-auto scrollbar-hide">
            <div className="flex justify-start items-center gap-2 text-foreground">
              <FilterCarTypeDialog />
              <FilterBrandDialog />
            </div>
            {/* <FilterDialog /> */}
            <AdvancedFilterDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
