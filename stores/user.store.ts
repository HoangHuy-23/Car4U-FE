import axiosClient from "@/lib/axiosClient";
import { Car } from "@/types/car.type";
import { RentalContact } from "@/types/contact.type";
import {
  DriverLicense,
  User,
  UserAddress,
  UserProfileUpdate,
} from "@/types/user.type";
import { toast } from "sonner";
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
  // Method for disabling car
  disableCar: (carId: string) => Promise<void>;
  // Method for enabling car
  enableCar: (carId: string) => Promise<void>;
  // Method for address management
  addAddress: (address: UserAddress) => Promise<void>;
  updateAddress: (addressId: string, address: UserAddress) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  makeAddressDefault: (addressId: string) => Promise<void>;
  // Method for driver license management
  updateDriverLicense: (license: DriverLicense) => Promise<void>;
  // Method for update user profile
  updatePhone: (phone: string) => Promise<void>;
  updateInfo: (data: UserProfileUpdate) => Promise<void>;
  // Method to get contact by renter
  myContact: RentalContact[] | null;
  getContactsByRenter: () => Promise<void>;
  // Method to get contact by owner
  ownerContact: RentalContact[] | null;
  getContactsByOwner: () => Promise<void>;
  // Method to clear the store
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
      myContact: null,
      ownerContact: null,

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
      disableCar: async (carId) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.put(`/cars/${carId}/disable`);
          set({
            myCars: get().myCars?.map((car) =>
              car.id === carId ? res.data.data : car
            ),
          });
          toast.success("Xe đã được vô hiệu hóa thành công.");
        } catch (error) {
          set({ error: "Failed to disable car." });
          toast.error("Vô hiệu hóa xe thất bại.");
        } finally {
          set({ isLoading: false });
        }
      },
      enableCar: async (carId) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.put(`/cars/${carId}/enable`);
          set({
            myCars: get().myCars?.map((car) =>
              car.id === carId ? res.data.data : car
            ),
          });
          toast.success("Xe đã được kích hoạt thành công.");
        } catch (error) {
          set({ error: "Failed to enable car." });
          toast.error("Kích hoạt xe thất bại.");
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
      // Driver license management method
      updateDriverLicense: async (license) => {
        set({ isLoading: true, error: null });
        toast.loading("Đang cập nhật...", {
          id: "update-license",
        });
        try {
          const form = new FormData();
          form.append("licenseNumber", license.licenseNumber);
          form.append("name", license.name);
          const formattedDob = new Date(license.dob).toISOString().slice(0, 10); // "2024-06-04"
          form.append("dob", formattedDob);

          if (license.file) {
            form.append("file", license.file);
          }
          const res = await axiosClient.put(
            "/users/update-driver-license",
            form,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          set({ user: res.data.data });
          toast.success("Cập nhật giấy phép lái xe thành công.", {
            id: "update-license",
          });
        } catch (error) {
          set({ error: "Failed to update driver license." });
          toast.error("Cập nhật giấy phép lái xe thất bại.", {
            id: "update-license",
          });
        } finally {
          set({ isLoading: false });
        }
      },
      // Update phone number
      updatePhone: async (phone) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.put(
            `/users/update-phone?phone=${phone} `
          );
          set({ user: res.data.data });
          toast.success("Cập nhật số điện thoại thành công.");
        } catch (error) {
          set({ error: "Failed to update phone number." });
          toast.error("Cập nhật số điện thoại thất bại.");
        } finally {
          set({ isLoading: false });
        }
      },
      // Update user information
      updateInfo: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.put("/users/update-info", data);
          set({ user: res.data.data });
          toast.success("Cập nhật thông tin thành công.");
        } catch (error) {
          set({ error: "Failed to update user information." });
          toast.error("Cập nhật thông tin thất bại.");
        } finally {
          set({ isLoading: false });
        }
      },
      // Method to get contacts by renter
      getContactsByRenter: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.get("/rental-contacts/renter");
          set({ myContact: res.data.data });
        } catch (error) {
          set({ error: "Failed to fetch contacts by renter." });
        } finally {
          set({ isLoading: false });
        }
      },
      // Method to get contacts by owner
      getContactsByOwner: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosClient.get("/rental-contacts/owner");
          set({ ownerContact: res.data.data });
        } catch (error) {
          set({ error: "Failed to fetch contacts by owner." });
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
