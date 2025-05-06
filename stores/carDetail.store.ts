import axiosClient from "@/lib/axiosClient";
import { Car } from "@/types/car.type";
import { User } from "@/types/user.type";
import { create } from "zustand";

interface iCarDetailStore {
  car: Car | null;
  owner: User | null;
  isLoading: boolean;
  error: string | null;
  getCar: (id: string) => Promise<void>;
  getOwner: (id: string) => Promise<void>;
}

export const useCarDetailStore = create<iCarDetailStore>((set) => ({
  car: null,
  owner: null,
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
  getOwner: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosClient.get(`/cars/external/${id}/owner`);
      const data = response.data.data;
      set({ owner: data, error: null });
    } catch (error) {
      set({ error: "An error occurred while fetching owned cars data." });
    } finally {
      set({ isLoading: false });
    }
  },
}));
