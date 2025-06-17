import { Car } from "./car.type";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: Date;
  rating: number;
  avatar: string | null;
  gender: string | null;
  numOfTrips: number;
  isActive: boolean;
  googleAccountId: string | null;
  facebookAccountId: string | null;
  driverLicense: DriverLicense | null;
  addresses: UserAddress[] | null;
  myCars: string[] | null;
  likedCars: string[] | null;
  createdAt: string | null;
};

export type DriverLicense = {
  licenseNumber: string;
  name: string;
  dob: Date;
  image: string | null;
  isVerified: boolean;
};

export type UserAddress = {
  id?: string;
  reminder: string;
  isDefault: boolean;
  no: string;
  street: string;
  district: string;
  ward: string;
  city: string;
  coordinates: number[];
  type: string; // "HOME" | "WORK" | "OTHER"
};
