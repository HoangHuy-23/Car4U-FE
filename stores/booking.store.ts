import { Car } from "@/types/car.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface iBookingStore {
  location: string;
  setLocation: (location: string) => void;
  pickupDate: Date | null;
  setPickupDate: (date: Date | null) => void;
  returnDate: Date | null;
  setReturnDate: (date: Date | null) => void;
  selectedCar: Car | null;
  setSelectedCar: (car: Car | null) => void;
}

export const useBookingStore = create<iBookingStore>()(
  persist(
    (set, get) => ({
      location: "",
      setLocation: (location: string) => set({ location }),
      pickupDate: null,
      setPickupDate: (date: Date | null) => set({ pickupDate: date }),
      returnDate: null,
      setReturnDate: (date: Date | null) => set({ returnDate: date }),
      selectedCar: null,
      setSelectedCar: (car: Car | null) => set({ selectedCar: car }),
    }),
    {
      name: "booking-storage", // unique name
    }
  )
);
