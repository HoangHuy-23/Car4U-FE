import CarDetail from "@/components/shared/car-detail/CarDetail";

type Props = {
  params: { id: string };
};

export default async function CarDetailPage({ params }: Props) {
  return <CarDetail carId={params.id} />;
}
