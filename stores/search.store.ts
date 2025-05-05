import axiosClient from "@/lib/axiosClient";
import { Car } from "@/types/car.type";
import { create } from "zustand";

interface iSearchStore {
  searchResults: Car[];
  isLoading: boolean;
  error: string | null;
  location: string;
  setLocation: (location: string) => void;
  pickupDate: Date | null;
  setPickupDate: (date: Date | null) => void;
  returnDate: Date | null;
  setReturnDate: (date: Date | null) => void;
  carType: string;
  setCarType: (carType: string) => void;
  brand: string;
  setBrand: (brand: string) => void;
  fuelType: string;
  setFuelType: (fuelType: string) => void;
  fuelConsumption: number[];
  setFuelConsumption: (fuelConsumption: number[]) => void;
  transmissionType: string;
  setTransmissionType: (transmissionType: string) => void;
  price: [number, number];
  setPrice: (price: [number, number]) => void;
  seat: [number, number];
  setSeat: (seat: [number, number]) => void;
  year: number[];
  setYear: (year: number[]) => void;
  features: string[];
  setFeatures: (features: string[] | ((prev: string[]) => string[])) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  pageNo: number;
  setPageNo: (pageNo: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  fetchSearchResults: () => Promise<void>;
}

export const useSearchStore = create<iSearchStore>((set, get) => ({
  searchResults: [],
  isLoading: false,
  error: null,
  location: "",
  setLocation: (location: string) => set({ location }),
  pickupDate: null,
  setPickupDate: (date: Date | null) => set({ pickupDate: date }),
  returnDate: null,
  setReturnDate: (date: Date | null) => set({ returnDate: date }),
  carType: "ALL",
  setCarType: (carType: string) => set({ carType }),
  brand: "ALL",
  setBrand: (brand: string) => set({ brand }),
  fuelType: "ALL",
  setFuelType: (fuelType: string) => set({ fuelType }),
  fuelConsumption: [0],
  setFuelConsumption: (fuelConsumption: number[]) => set({ fuelConsumption }),
  transmissionType: "ALL",
  setTransmissionType: (transmissionType: string) => set({ transmissionType }),
  price: [0, 10000000],
  setPrice: (price: [number, number]) => set({ price }),
  seat: [2, 16],
  setSeat: (seat: [number, number]) => set({ seat }),
  year: [0],
  setYear: (year: number[]) => set({ year }),
  features: [],
  setFeatures: (features) =>
    set((state) => ({
      features:
        typeof features === "function" ? features(state.features) : features,
    })),
  sortBy: "DEFAULT",
  setSortBy: (sortBy: string) => set({ sortBy }),
  pageNo: 1,
  setPageNo: (pageNo: number) => set({ pageNo }),
  hasMore: true,
  setHasMore: (hasMore: boolean) => set({ hasMore }),
  fetchSearchResults: async () => {
    set({ isLoading: true, error: null });
    try {
      const {
        location,
        carType,
        brand,
        fuelType,
        fuelConsumption,
        transmissionType,
        price,
        seat,
        year,
        features,
        sortBy,
        pageNo,
        searchResults,
      } = get();

      const response = await axiosClient.get("/cars/filter", {
        params: {
          pageNo,
          location,
          type: carType === "ALL" ? null : carType,
          brand: brand === "ALL" ? null : brand,
          fuelType: fuelType === "ALL" ? null : fuelType,
          fuelConsumption: fuelConsumption[0] === 0 ? null : fuelConsumption[0],
          transmissionType:
            transmissionType === "ALL" ? null : transmissionType,
          minPrice: price[0],
          maxPrice: price[1],
          minSeats: seat[0],
          maxSeats: seat[1],
          year: year[0] === 0 ? null : year[0],
          features: features.length === 0 ? null : features.join(","),
          sortBy,
        },
      });
      const newResult = response.data.data.data;

      set({
        searchResults:
          pageNo === 1 ? newResult : [...searchResults, ...newResult],
        isLoading: false,
        hasMore: newResult.length > 0,
      });
    } catch (error) {
      set({ error: "Failed to fetch search results", isLoading: false });
    }
  },
}));
