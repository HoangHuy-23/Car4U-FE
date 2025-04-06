"use client";
import { calculateDaysDifference, formatDate, formatDateToStringType1, formatTimeToString, updateDateWithTime } from "@/lib/date/format";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { ArrowDown, ArrowRight, CalendarRange } from "lucide-react";
import { Calendar } from "../ui/calendar";
import SelectTimeInput from "../dialog/SelectTimeInput";

type Props = {
  pickupDate: Date;
  setPickupDate: (date: Date) => void;
  returnDate: Date;
  setReturnDate: (date: Date) => void;
  isPick: boolean;
};

const SearchDateInput = ({
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  isPick,
}: Props) => {
     const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(pickupDate),
    to: new Date(returnDate),
    });
    const [startTime, setStartTime] = useState<string>(formatTimeToString(new Date(pickupDate)));
    const [endTime, setEndTime] = useState<string>(formatTimeToString(new Date(returnDate)));
    
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setDate({
            from: new Date(pickupDate),
            to: new Date(returnDate),
        });
        setStartTime(formatTimeToString(new Date(pickupDate)));
        setEndTime(formatTimeToString(new Date(returnDate)));
    }, [pickupDate, returnDate]);

    const handleSave = () => {
        if (!date?.from || !date?.to) return;
    
        const today = new Date();
        const newPickupDate = updateDateWithTime(new Date(date.from), startTime);
        const newReturnDate = updateDateWithTime(new Date(date.to), endTime);
    
        // Validate pickup date is not in the past
        if (newPickupDate < today) {
          alert("Pickup date cannot be in the past.");
          return;
        }
    
        // Validate return date is at least one day after pickup
        const timeDiff = newReturnDate.getTime() - newPickupDate.getTime();
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
        if (dayDiff < 1) {
          alert("Return date must be at least one day after pickup.");
          return;
        }
    
        // Update parent state
        setPickupDate(newPickupDate);
        setReturnDate(newReturnDate);
        setOpen(false);
      };

      const calculatedDaysDifference = date?.from && date?.to
    ? calculateDaysDifference(
        updateDateWithTime(date.from, startTime),
        updateDateWithTime(date.to, endTime)
      )
    : 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button
        variant="outline"
        className="w-full h-[40px] justify-between text-sm font-normal"
      >
        {isPick ? formatDate(pickupDate) : formatDate(returnDate)}
        <CalendarRange className="float-start ml-2" width={14} height={14} />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[535px]">
      <DialogHeader>
        <DialogTitle className="text-center">Time</DialogTitle>
      </DialogHeader>
      <div id="date" className="flex items-center justify-center">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </div>
      <div
        id="time"
        className="flex justify-between items-center flex-col sm:flex-row w-full"
      >
        <SelectTimeInput time={startTime} setTime={setStartTime} />
        <ArrowRight className="sm:block hidden m-2 rounded-full border p-1" />
        <ArrowDown className="block sm:hidden m-2 rounded-full border p-1" />
        <SelectTimeInput time={endTime} setTime={setEndTime} />
      </div>
      <DialogFooter className="sm:justify-between sm:flex-row flex-col gap-2 items-center">
        <div className="flex flex-col text-sm">
          <span>
            {formatDateToStringType1(date?.from || new Date())} -{" "}
            {formatDateToStringType1(date?.to || new Date())}
          </span>
          <span>Number of car rental days: {calculatedDaysDifference} days</span>
        </div>
        <Button
          type="button"
          className="bg-blue-500 hover:bg-blue-300"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
};

export default SearchDateInput;
