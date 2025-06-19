import { Car } from "./car.type";
import { User } from "./user.type";

export type RentalContact = {
    id?: string;
    carId?: string;
    car?: Car | null;
    renterId?: string;
    renter?: User | null;
    ownerId?: string;
    owner?: User | null;
    pickupDate: Date | null;
    returnDate: Date | null;
    pickupLocation: PickupLocation;
    rentalFee: number;
    vat: number;
    totalFee: number;
    depositFee: number;
    collateralAmount?: number;
    status: RentalStatus | RentalStatus.PENDING;
    createdAt?: Date | null;
};

export enum PickupLocation {
    USER_LOCATION = "USER_LOCATION",
    CAR_LOCATION = "CAR_LOCATION",
}

export enum RentalStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    CANCELED = "CANCELED",
    COMPLETED = "COMPLETED",
    REJECTED = "REJECTED",
}

export type PaymentResponse = {
  code: string;
  message: string;
  paymentUrl: string;
};