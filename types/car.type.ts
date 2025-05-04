export type Car = {
    id: string;
    ownerId: string;
    name: string;
    brand: string;
    model: string;
    color: string;
    year: number;
    licensePlate: string;
    vin: string;
    fuelType: string;
    fuelConsumption: number;
    transmissionType: string;
    type: string;
    numOfSeats: number;
    numOfTrips: number;
    images: string[];
    pricePerDay: number;
    status: string;
    location: CarLocation;
    description: string;
    features: string[];
    rating: number;
    numOfRatings: number;
    deliveryPolicy: CarDeliveryPolicy;
    collateralRequired: boolean;
    collateralAmount: number;
    isVerified: boolean;
    verificationNote: string | null;
    isDeleted: boolean;
};

export type CarLocation = {
    fullAddress: string;
    district: string;
    city: string;
    coordinates: number[];
};

export type CarDeliveryPolicy = {
    allowDelivery: boolean;
    freeDeliveryRadiusKm: number;
    maxDeliveryDistanceKm: number;
    deliveryFeePerKm: number;
};