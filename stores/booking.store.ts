import axiosClient from "@/lib/axiosClient";
import { Car } from "@/types/car.type";
import { PaymentResponse, PickupLocation, RentalContact } from "@/types/contact.type";
import { User } from "@/types/user.type";
import { toast } from "sonner";
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
  bookingStep: number;
  setBookingStep: (step: number) => void;
  pickupLocation: PickupLocation;
  setPickupLocation: (location: PickupLocation) => void;
  contact: RentalContact | null;
  setContact: (contact: RentalContact | null) => void;
  owner: User | null;
  setOwner: (owner: User | null) => void;
  fetchOwner: (userId: string) => Promise<void>;
  getPaymentLink: (amount: number) => Promise<PaymentResponse>;
  createContact: (contact: RentalContact) => Promise<RentalContact>;
  clear: () => void;
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
      bookingStep: 1,
      setBookingStep: (step: number) => set({ bookingStep: step }),
      pickupLocation: PickupLocation.USER_LOCATION,
      setPickupLocation: (location: PickupLocation) =>
        set({ pickupLocation: location }),
      contact: null,
      setContact: (contact: RentalContact | null) => set({ contact }),
      owner: null,
      setOwner: (owner: User | null) => set({ owner }),
      fetchOwner: async (userId: string) => {
        try {
          const response = await axiosClient.get(`/users/${userId}`);
          const data = response.data.data as User;
          set({ owner: data });
        } catch (error) {
          toast.error("Failed to fetch owner information.");
        }
      },
      getPaymentLink: async (amount: number) => {
        try {
          const response = await axiosClient.get(
            `/payments/vn-pay?amount=${amount}&bankcode=NCB`
          );
          return response.data as PaymentResponse;
        } catch (error) {
          console.error("Error fetching payment link:", error);
          throw error;
        }
      },
      createContact: async (contact: RentalContact) => {
        try {
          const response = await axiosClient.post("/rental-contacts", contact);
          const data = response.data.data as RentalContact;
          set({ contact: data });
          // toast.success("Contact created successfully.");
          return data;
        } catch (error) {
          console.error("Error creating contact:", error);
          toast.error("Failed to create contact.");
          throw error;
        }
      },
      clear: () =>
        set({
          bookingStep: 1,
          pickupLocation: PickupLocation.USER_LOCATION,
          contact: null,
          owner: null,
        }),
    }),
    {
      name: "booking-storage", // unique name
    }
  )
);
