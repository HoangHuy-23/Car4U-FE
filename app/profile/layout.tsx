import ProfileNav from "@/components/layout/ProfileNav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-neutral-100 py-12 min-h-[100vh]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[2fr_5fr] ">
        <ProfileNav />
        {children}
      </div>
    </section>
  );
}
