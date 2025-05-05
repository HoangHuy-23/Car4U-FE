import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils"; // nếu dùng classnames helper
import React from "react";

interface CarTypeItemProps {
  icon: StaticImageData; // đường dẫn tới ảnh SVG hoặc PNG
  label: string;
  count: number | string;
  active?: boolean;
  onClick?: () => void;
}

const CarTypeItem: React.FC<CarTypeItemProps> = ({ icon, label, count, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center border rounded-xl p-4 cursor-pointer transition-all duration-200 w-[120px] h-[120px]",
        active ? "border-blue-500 shadow-md bg-primary/20" : "border-gray-200 hover:border-gray-300  hover:shadow-2xl"
      )}
    >
      <Image src={icon} alt={label} width={36} height={36} className="mb-2" />
      <p className="text-sm text-center font-medium">{label}</p>
      <p className="text-xs text-muted-foreground mt-1">{count}</p>
    </div>
  );
};

export default CarTypeItem;
