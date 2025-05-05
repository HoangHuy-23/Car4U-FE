"use clientt";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, MapPin } from "lucide-react";
import { Separator } from "../../ui/separator";
import { useEffect, useMemo, useState } from "react";
import { useSearchStore } from "@/stores/search.store";
import { useSearchParams } from "next/navigation";

const locations = [
  { id: 1, value: "hanoi", label: "Hà Nội" },
  { id: 2, value: "danang", label: "Đà Nẵng" },
  { id: 3, value: "saigon", label: "Thành phố Hồ Chí Minh" },
  { id: 4, value: "haiphong", label: "Hải Phòng" },
  { id: 5, value: "cantho", label: "Cần Thơ" },
  { id: 6, value: "dalat", label: "Đà Lạt" },
  { id: 7, value: "phuquoc", label: "Phú Quốc" },
  { id: 8, value: "nhaTrang", label: "Nha Trang" },
  { id: 9, value: "quangbinh", label: "Quảng Bình" },
  { id: 10, value: "quangninh", label: "Quảng Ninh" },
  { id: 11, value: "vungtau", label: "Vũng Tàu" },
  { id: 12, value: "hue", label: "Huế" },
  { id: 14, value: "namdinh", label: "Nam Định" },
  { id: 15, value: "bacninh", label: "Bắc Ninh" },
  { id: 16, value: "binhduong", label: "Bình Dương" },
  { id: 17, value: "dongnai", label: "Đồng Nai" },
  { id: 18, value: "longan", label: "Long An" },
  { id: 19, value: "tiengiang", label: "Tiền Giang" },
  { id: 20, value: "baochau", label: "Bảo Châu" },
];

export function FilterLocationDialog() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const locationParam = searchParams.get("location");
  const [search, setSearch] = useState("");
  const isSearching = search.trim() !== "";
  const [isEditing, setIsEditing] = useState(false);
  const { location, setLocation, fetchSearchResults, setPageNo } = useSearchStore();

  useEffect(() => {
    if (locationParam) {
      const foundLocation = locations.find(
        (loc) => loc.value === locationParam
      );
      if (foundLocation) {
        setLocation(foundLocation.value);
        setSearch(foundLocation.label);
      } else {
        setSearch(location);
      }
    }
  }, []);

  const filteredLocations = useMemo(() => {
    const lowerCaseSearch = search.toLowerCase();
    return locations.filter((location) =>
      location.label.toLowerCase().includes(lowerCaseSearch)
    );
  }, [search]);
  const handleLocationChange = (location: string) => {
    setSearch(location);
    setIsEditing(false);
  };
  const locationValue = useMemo(() => {
    const foundLocation = locations.find((loc) => loc.value === location);
    return foundLocation ? foundLocation.label : location;
  }, [location]);

  const handleSearch = () => {
    const foundLocation = locations.find((loc) => loc.label === search);
    if (foundLocation) {
      setLocation(foundLocation.value);
      setPageNo(1); // reset page number to 1 when searching
      fetchSearchResults();
    } else {
      setLocation(search);
    }
    setOpen(false); // close dialog here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="p-0 text-left gap-1 text-foreground flex items-center cursor-pointer">
          <MapPin className="" size={18} />
          <span className="ml-2">{locationValue}</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Location</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <Separator className="" />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="name" className="text-right">
              Name
            </Label> */}
            <div className="col-span-4 relative flex items-center space-x-2 border rounded-md p-2">
              <MapPin className="absolute left-0 ml-2 text-muted-foreground size-5" />
              <input
                id="name"
                // defaultValue="Pedro Duarte"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsEditing(true);
                }}
                className="w-full ml-6 outline-none"
              />
            </div>
            <div
              className={`col-span-4 items-center space-x-2 border rounded-md p-2 min-h-[220px] ${
                isEditing ? "flex" : "hidden"
              }`}
            >
              {/* result location */}
              {filteredLocations.length > 0 ? (
                <div className="w-full max-h-48 overflow-y-auto divide-y rounded-md border">
                  {filteredLocations.map((loc) => (
                    <div
                      key={loc.id}
                      className="px-4 py-2 cursor-pointer hover:bg-accent"
                      onClick={() => {
                        handleLocationChange(loc.value);
                        setSearch(loc.label); // cập nhật input
                      }}
                    >
                      {loc.label}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-2 text-muted-foreground">
                  Không tìm thấy địa điểm phù hợp
                </div>
              )}
            </div>
          </div>
          {!isEditing && (
            <>
              <Separator className="" />
              <div className="grid grid-cols-4 items-center gap-4">
                <Button
                  variant="outline"
                  className="col-span-4 flex items-center justify-start space-x-2"
                >
                  <MapPin className="mr-2" size={16} />
                  Current Location
                </Button>
              </div>
              <Separator className="" />
              <Label htmlFor="name" className="text-right">
                My Location
              </Label>
              <div className="grid grid-cols-4 items-center gap-4">
                <Button
                  variant="outline"
                  className="col-span-4 flex items-center justify-start space-x-2"
                >
                  <Building2 className="mr-2" size={16} />
                  Company Location
                </Button>
              </div>
            </>
          )}
        </div>
        {!isEditing && (
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                handleSearch();
                setIsEditing(false);
              }}
            >
              Search
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
