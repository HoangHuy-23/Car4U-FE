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

const carTypes = [
  { icon: mini, label: "4 chỗ (Mini)", count: 137 },
  { icon: sedan, label: "4 chỗ (Sedan)", count: "200+" },
  { icon: cuv, label: "5 chỗ (CUV Gầm cao)", count: "200+" },
  { icon: suv, label: "7 chỗ (SUV Gầm cao)", count: "200+" },
  { icon: mpv, label: "7 chỗ (MPV Gầm thấp)", count: "200+" },
  { icon: pickup, label: "Bán tải", count: 80, active: true },
];

export function FilterCarTypeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="px-2 text-left gap-1 text-foreground flex items-center cursor-pointer rounded-full border border-gray-300">
          <Car className="" size={18} />
          <span className="ml-1">Car Type</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-center">Type</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {carTypes.map((item, index) => (
            <CarTypeItem key={index} {...item} />
          ))}
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
