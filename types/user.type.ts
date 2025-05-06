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
  createdAt: string | null;
};

export type DriverLicense = {
  licenseNumber: string;
  name: string;
  dob: Date;
  image: string | null;
  isVerified: boolean;
};
