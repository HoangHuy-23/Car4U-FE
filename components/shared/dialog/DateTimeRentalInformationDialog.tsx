"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  calculateDaysDifference,
  formatDateToStringType1,
  formatDateToStringType3,
  formatTimeToString,
  updateDateWithTime
} from "@/lib/dateFormat";
import { useBookingStore } from "@/stores/booking.store";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "../../ui/calendar";
import { Separator } from "../../ui/separator";
import SelectTimeInput from "./SelectTimeInput";

export function DateTimeRentalInformationDialog() {
  const {pickupDate, returnDate, setPickupDate, setReturnDate } = useBookingStore();

  const [date, setDate] = useState<DateRange | undefined>({
    from: pickupDate ? new Date(pickupDate) : undefined,
    to: returnDate ? new Date(returnDate) : undefined,
  });
  const [startTime, setStartTime] = useState<string>(
    formatTimeToString(pickupDate || new Date())
  );
  const [endTime, setEndTime] = useState<string>(
    formatTimeToString(returnDate || new Date())
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDate({
      from: pickupDate ? new Date(pickupDate) : undefined,
      to: returnDate ? new Date(returnDate) : undefined,
    });
    setStartTime(formatTimeToString(pickupDate || new Date()));
    setEndTime(formatTimeToString(returnDate || new Date()));
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

  const calculatedDaysDifference =
    date?.from && date?.to
      ? calculateDaysDifference(
          updateDateWithTime(date.from, startTime),
          updateDateWithTime(date.to, endTime)
        )
      : 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="border rounded-md flex cursor-pointer bg-white">
          <div className="flex flex-col p-3 w-full">
            <p className="text-start">Nhận xe</p>
            <div className="flex justify-between">
              <span>{formatDateToStringType3(pickupDate || new Date())}</span>
              <span>{formatTimeToString(pickupDate || new Date())}</span>
            </div>
          </div>
          <Separator orientation="vertical" className="" />
          <div className="flex flex-col p-3 w-full">
            <p className="text-start">Trả xe</p>
            <div className="flex justify-between">
              <span>{formatDateToStringType3(returnDate || new Date())}</span>
              <span>{formatTimeToString(returnDate || new Date())}</span>
            </div>
          </div>
        </div>
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
            onSelect={(range) => setDate(range as unknown as DateRange)}
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
            <span>
              Number of car rental days: {calculatedDaysDifference} days
            </span>
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
}
