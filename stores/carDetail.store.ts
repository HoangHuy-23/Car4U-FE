import axiosClient from "@/lib/axiosClient";
import { Car } from "@/types/car.type";
import { create } from "zustand";

interface iCarDetailStore {
  car: Car | null;
  isLoading: boolean;
  error: string | null;
  getCar: (id: string) => Promise<void>;
  getOwnedCars: () => Promise<void>;
}

export const useCarDetailStore = create<iCarDetailStore>((set) => ({
  car: null,
  isLoading: false,
  error: null,
  getCar: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosClient.get(`/cars/external/${id}`);
      const data = response.data.data;
      set({ car: data, error: null });
    } catch (error) {
      set({ error: "An error occurred while fetching car data." });
    } finally {
      set({ isLoading: false });
    }
  },
  getOwnedCars: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/cars/owned");
      if (!res.ok) throw new Error("Failed to fetch owned cars data");
      const data = await res.json();
      set({ car: data, error: null });
    } catch (error) {
      set({ error: "An error occurred while fetching owned cars data." });
    } finally {
      set({ isLoading: false });
    }
  },
}));
