export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  rating: number;
  avatar: string | null;
  gender: string | null;
  numOfTrips: number;
  isActive: boolean;
  createdAt: string | null;
};
