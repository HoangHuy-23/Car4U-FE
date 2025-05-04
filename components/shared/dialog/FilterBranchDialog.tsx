import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Car } from "lucide-react";
import { Separator } from "../../ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function FilterBranchDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="px-2 text-left gap-1 text-foreground flex items-center cursor-pointer rounded-full border border-gray-300">
          <Car className="" size={18} />
          <span className="ml-1">Car Branch</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-center">Branch</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />

        {/* Car Brand Radio Group */}
        <RadioGroup className="grid grid-cols-3 gap-4">
          {/* Toyota */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="toyota" id="toyota" />
            <Label
              htmlFor="toyota"
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src="/toyota.svg"
                alt="Toyota"
                className="h-6 w-6 object-contain"
              />
              Toyota
            </Label>
          </div>

          {/* BMW */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bmw" id="bmw" />
            <Label
              htmlFor="bmw"
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src="/bmw.svg"
                alt="BMW"
                className="h-6 w-6 object-contain"
              />
              BMW
            </Label>
          </div>

          {/* Mercedes */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mercedes" id="mercedes" />
            <Label
              htmlFor="mercedes"
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src="/mercedes.svg"
                alt="Mercedes"
                className="h-6 w-6 object-contain"
              />
              Mercedes
            </Label>
          </div>

          {/* Honda */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="honda" id="honda" />
            <Label
              htmlFor="honda"
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src="/honda.svg"
                alt="Honda"
                className="h-6 w-6 object-contain"
              />
              Honda
            </Label>
          </div>

          {/* Ford */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ford" id="ford" />
            <Label
              htmlFor="ford"
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src="/ford.svg"
                alt="Ford"
                className="h-6 w-6 object-contain"
              />
              Ford
            </Label>
          </div>

          {/* Tesla */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tesla" id="tesla" />
            <Label
              htmlFor="tesla"
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src="/tesla.svg"
                alt="Tesla"
                className="h-6 w-6 object-contain"
              />
              Tesla
            </Label>
          </div>
        </RadioGroup>

        <DialogFooter>
          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
