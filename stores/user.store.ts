import axiosClient from "@/lib/axiosClient";
import { Car } from "@/types/car.type";
import { User, UserAddress } from "@/types/user.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface iUserStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  myCars: Car[] | null;
  likedCars: Car[] | null;
  setUser: (user: User | null) => void;
  getUserProfile: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  getMyCars: () => Promise<Car[] | null>;
  getLikedCars: () => Promise<Car[] | null>;
  // Methods for liking and unliking cars
  likeCar: (carId: string) => Promise<void>;
  unlikeCar: (carId: string) => Promise<void>;
  // Method for address management
  addAddress: (address: UserAddress) => Promise<void>;
  updateAddress: (addressId: string, address: UserAddress) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  makeAddressDefault: (addressId: string) => Promise<void>;
  clear: () => void;
}

export const useUserStore = create<iUserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      myCars: null,
      likedCars: null,

      setUser: (user) => {
        set({ user });
      },

      getUserProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.get("/user/profile");
          set({ user: res.data.data, error: null });
        } catch (error) {
          set({ error: "Failed to fetch user profile." });
        } finally {
          set({ isLoading: false });
        }
      },

      updateUserProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.put("/user/profile", data);
          set({ user: res.data.data, error: null });
        } catch (error) {
          set({ error: "Failed to update user profile." });
        } finally {
          set({ isLoading: false });
        }
      },
      getMyCars: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.get("/users/my-cars");
          set({ myCars: res.data.data, error: null });
          return res.data.data as Car[];
        } catch (error) {
          set({ error: "Failed to fetch my cars." });
          return null;
        } finally {
          set({ isLoading: false });
        }
      },
      // like and unlike cars
      getLikedCars: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.get("/users/my-favorites");
          set({ likedCars: res.data.data, error: null });
          return res.data.data as Car[];
        } catch (error) {
          set({ error: "Failed to fetch liked cars." });
          return null;
        } finally {
          set({ isLoading: false });
        }
      },

      likeCar: async (carId) => {
        set({ isLoading: true, error: null });
        try {
          await axiosClient.post(`/users/like-car/${carId}`);
          get().getLikedCars(); // Refresh liked cars after liking
          // Optionally refresh user profile or liked cars
        } catch (error) {
          set({ error: "Failed to like car." });
        } finally {
          set({ isLoading: false });
        }
      },

      unlikeCar: async (carId) => {
        set({ isLoading: true, error: null });
        try {
          await axiosClient.delete(`/users/unlike-car/${carId}`);
          get().getLikedCars(); // Refresh liked cars after unliking
          // Optionally refresh user profile or liked cars
        } catch (error) {
          set({ error: "Failed to unlike car." });
        } finally {
          set({ isLoading: false });
        }
      },
      //      // Address management methods
      addAddress: async (address) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.post("/users/add-address", address);
          set({ user: res.data.data });
        } catch (error) {
          set({ error: "Failed to add address." });
        } finally {
          set({ isLoading: false });
        }
      },

      updateAddress: async (addressId, address) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.put(
            `/users/update-address/${addressId}`,
            address
          );
          set({ user: res.data.data });
        } catch (error) {
          set({ error: "Failed to update address." });
        } finally {
          set({ isLoading: false });
        }
      },

      deleteAddress: async (addressId) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.delete(
            `/users/delete-address/${addressId}`
          );
          set({ user: res.data.data });
        } catch (error) {
          set({ error: "Failed to delete address." });
        } finally {
          set({ isLoading: false });
        }
      },

      makeAddressDefault: async (addressId) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.post(
            `/users/make-default-address/${addressId}`
          );
          set({ user: res.data.data });
        } catch (error) {
          set({ error: "Failed to make address default." });
        } finally {
          set({ isLoading: false });
        }
      },

      clear: () =>
        set({
          user: null,
          isLoading: false,
          error: null,
          myCars: null,
          likedCars: null,
        }),
    }),
    {
      name: "user-store", // unique name for the storage
    }
  )
);
