import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Car, CheckIcon } from "lucide-react";
import { Separator } from "../../ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSearchStore } from "@/stores/search.store";
import Image from "next/image";
import { useState } from "react";

const carBrands = [
  {
    value: "ALL",
    label: "All",
    icon: "",
  },
  { value: "audi", label: "Audi", icon: "/logoBrand/audi.png" },
  { value: "nissan", label: "Nissan", icon: "/logoBrand/nissan.png" },
  { value: "mazda", label: "Mazda", icon: "/logoBrand/mazda.webp" },
  { value: "hyundai", label: "Hyundai", icon: "/logoBrand/hyundai.png" },
  { value: "chevrolet", label: "Chevrolet", icon: "/logoBrand/chev.png" },
  { value: "toyota", label: "Toyota", icon: "/logoBrand/toyota.png" },
  { value: "bmw", label: "BMW", icon: "/logoBrand/bmw.png" },
  { value: "mercedes", label: "Mercedes", icon: "/logoBrand/mercedes.png" },
  { value: "honda", label: "Honda", icon: "/logoBrand/honda.png" },
  { value: "ford", label: "Ford", icon: "/logoBrand/ford.png" },
  { value: "tesla", label: "Tesla", icon: "/logoBrand/tesla.png" },
  { value: "kia", label: "Kia", icon: "/logoBrand/kia.png" },
  {
    value: "volkswagen",
    label: "Volkswagen",
    icon: "/logoBrand/volkswagen.png",
  },
  { value: "subaru", label: "Subaru", icon: "/logoBrand/subaru.png" },
  { value: "vinfast", label: "Vinfast", icon: "/logoBrand/vinfast.png" },
];

export function FilterBrandDialog() {
  const [isChecked, setIsChecked] = useState(false);
  const { brand, setBrand, fetchSearchResults, setPageNo } = useSearchStore();
  const handleBrandChange = (value: string) => {
    setIsChecked(value !== "ALL");
    setBrand(value);
    setPageNo(1);
    fetchSearchResults();
  };
  const isBrandSelected = (value: string) => {
    return brand === value;
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`px-2 text-left gap-1 text-foreground flex items-center cursor-pointer rounded-full border border-gray-300 ${
            isChecked ? "bg-primary/20" : ""
          }`}
        >
          <Car className="" size={18} />
          <span className="ml-1">Car Brand</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-center">Brand</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />

        {/* Car Brand Radio Group */}
        <RadioGroup className="grid grid-cols-3 gap-4" defaultValue={brand}>
          {carBrands.map((brand) => (
            <div
              key={brand.value}
              className="flex items-center space-x-2"
              onClick={() => handleBrandChange(brand.value)}
            >
              <RadioGroupItem value={brand.value} id={brand.value} />
              <Label
                htmlFor={brand.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                {brand.icon !== "" && (
                  <Image
                    src={brand.icon}
                    alt={brand.label}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                )}
                <span className="text-sm font-medium">{brand.label}</span>
                {isBrandSelected(brand.value) && (
                  <CheckIcon className="h-4 w-4 text-primary" />
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <DialogFooter>
          {/* <Button type="submit" className="w-full">
            Save changes
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
