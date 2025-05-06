import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car } from "lucide-react";
import { Separator } from "../../ui/separator";
import CarTypeItem from "./CarTypeItem";

import mini from "../../../public/mini.png";
import sedan from "../../../public/sedan.png";
import cuv from "../../../public/cuv.png";
import suv from "../../../public/suv.png";
import mpv from "../../../public/mpv.png";
import pickup from "../../../public/pickup-truck.png";
import { useState } from "react";
import { useSearchStore } from "@/stores/search.store";

const carTypes = [
  { icon: mini, value: "HATCHBACK", label: "Hatchback", count: 137 },
  { icon: sedan, value: "SEDAN", label: "Sedan", count: "200+" },
  { icon: cuv, value: "CUV", label: "CUV", count: "200+" },
  { icon: suv, value: "SUV", label: "SUV", count: "200+" },
  { icon: mpv, value: "MPV", label: "MPV", count: "200+" },
  { icon: pickup, value: "PICKUP", label: "Pickup", count: 80 },
];

export function FilterCarTypeDialog() {
  const [open, setOpen] = useState(false);
  const { carType, setCarType, fetchSearchResults, setPageNo } = useSearchStore();
  const [isChecked, setIsChecked] = useState(false);
  const handleCarTypeChange = (type: string) => {
    if (carType === type) {
      setCarType("ALL");
      setPageNo(1);
      fetchSearchResults();
      setIsChecked(false);
      return;
    }
    setCarType(type);
    setPageNo(1);
    fetchSearchResults();
    setIsChecked(true);
  };
  const isCarTypeSelected = (type: string) => {
    return carType === type;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={`px-2 text-left gap-1 text-foreground flex items-center cursor-pointer rounded-full border border-gray-300 ${isChecked ? "bg-primary/20" : ""}`}>
          <Car className="" size={18} />
          <span className="ml-1">Loại xe</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-center">Loại xe</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {carTypes.map((item, index) => (
            <CarTypeItem
              key={index}
              icon={item.icon}
              label={item.label}
              count={item.count}
              active={isCarTypeSelected(item.value)}
              onClick={() => handleCarTypeChange(item.value)}
            />
          ))}
        </div>
        <DialogFooter>
          {/* <Button type="submit" className="w-full">
            Save changes
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
