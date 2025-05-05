import CarDetail from "@/components/shared/car-detail/CarDetail";

export default function CarDetailPage({ params }: { params: { id: string } }) {
  return <CarDetail carId={params.id} />;
}
