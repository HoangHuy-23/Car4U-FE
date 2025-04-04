export type DataLogin = {
  email: string;
  password: string;
};

export type DataRegister = {
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  gender: string;
};

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
