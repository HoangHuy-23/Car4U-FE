"use client";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { cn } from "@/lib/utils";

type Props = {
  location: string;
  setLocation: (location: string) => void;
  isEmpty: boolean;
  setIsEmpty: (isEmpty: boolean) => void;
};

const locations = [
  { id: 1, value: "hanoi", label: "Hà Nội" },
  { id: 2, value: "danang", label: "Đà Nẵng" },
  { id: 3, value: "saigon", label: "Thành phố Hồ Chí Minh" },
  { id: 4, value: "haiphong", label: "Hải Phòng" },
  { id: 5, value: "cantho", label: "Cần Thơ" },
  { id: 6, value: "dalat", label: "Đà Lạt" },
  { id: 7, value: "phuquoc", label: "Phú Quốc" },
  { id: 8, value: "nhaTrang", label: "Nha Trang" },
  { id: 9, value: "quangbinh", label: "Quảng Bình" },
  { id: 10, value: "quangninh", label: "Quảng Ninh" },
  { id: 11, value: "vungtau", label: "Vũng Tàu" },
  { id: 12, value: "hue", label: "Huế" },
  { id: 14, value: "namdinh", label: "Nam Định" },
  { id: 15, value: "bacninh", label: "Bắc Ninh" },
  { id: 16, value: "binhduong", label: "Bình Dương" },
  { id: 17, value: "dongnai", label: "Đồng Nai" },
  { id: 18, value: "longan", label: "Long An" },
  { id: 19, value: "tiengiang", label: "Tiền Giang" },
  { id: 20, value: "baochau", label: "Bảo Châu" },
];

const SearchLocationInput = ({
  location,
  setLocation,
  isEmpty,
  setIsEmpty,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(location);

  useEffect(() => {
    setValue(location);
  }, [location]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full min-w-52 h-[40px] justify-between text-sm font-normal ${
            isEmpty ? "border-red-500" : ""
          }`}
        >
          {value
            ? locations.find((location) => location.value === value)?.label
            : "Choose your location"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Find your location..."
            className="h-9 text-sm"
          />
          <CommandList>
            <CommandEmpty>Not found location.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setLocation(location.value);
                    setIsEmpty(false);
                  }}
                >
                  {location.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === location.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchLocationInput;
