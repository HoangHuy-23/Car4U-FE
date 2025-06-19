"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/currencyFormat";
import { useSearchStore } from "@/stores/search.store";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Separator } from "../../ui/separator";

const FEATURES = [
  { value: "MAP", label: "Bản đồ" },
  { value: "BLUETOOTH", label: "Bluetooth" },
  { value: "CAMERA_360", label: "Camera 360" },
  { value: "SIDE_CAMERA", label: "Camera bên hông" },
  { value: "DASH_CAM", label: "Camera hành trình" },
  { value: "REVERSING_CAMERA", label: "Camera lùi" },
  { value: "TIRE_PRESSURE_SENSOR", label: "Cảm biến áp suất lốp" },
  { value: "COLLISION_SENSOR", label: "Cảm biến va chạm" },
  { value: "SPEED_WARNING", label: "Cảnh báo tốc độ" },
  { value: "SUNROOF", label: "Cửa sổ trời" },
  { value: "GPS_NAVIGATION", label: "Định vị GPS" },
  { value: "CHILD_SEAT", label: "Ghế trẻ em" },
  { value: "USB_PORT", label: "Cổng USB" },
  { value: "SPARE_TIRE", label: "Lốp dự phòng" },
  { value: "DVD_SCREEN", label: "Màn hình DVD" },
  { value: "PICKUP_TRUCK_BED_COVER", label: "Nắp thùng xe bán tải" },
  { value: "ETC", label: "ETC (Thu phí tự động)" },
  { value: "AIRBAG", label: "Túi khí" },
];

export function AdvancedFilterDialog() {
  const {
    sortBy,
    setSortBy,
    price,
    setPrice,
    transmissionType,
    setTransmissionType,
    fuelType,
    setFuelType,
    fuelConsumption,
    setFuelConsumption,
    seat,
    setSeat,
    year,
    setYear,
    features,
    setFeatures,
    fetchSearchResults,
    setPageNo,
  } = useSearchStore();
  // const [kmLimit, setKmLimit] = useState([0]);
  // const [distance, setDistance] = useState([0]);

  const toggleFeature = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleReset = () => {
    setSortBy("DEFAULT");
    setPrice([0, 10000000]);
    // setKmLimit([0]);
    // setDistance([0]);
    setTransmissionType("ALL");
    setSeat([2, 16]);
    setYear([0]);
    setFuelConsumption([0]);
    setFuelType("ALL");
    setFeatures([]);
    setPageNo(1);
  };

  const handleFilter = () => {
    // Handle filter logic here
    console.log({
      sortBy,
      price,
      transmissionType,
      seat,
      year,
      fuelConsumption,
      fuelType,
      features,
    });
    setPageNo(1); // Reset page number to 1 when applying filters
    fetchSearchResults();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <SlidersHorizontal size={18} className="text-foreground" />
          <span className="ml-1">Bộ lọc</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Bộ lọc</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        <div className="grid gap-4 py-4 h-[60vh] overflow-y-auto scrollable-content pr-2">
          {/* Sắp xếp */}
          <div className="space-y-2">
            <Label>Sắp xếp</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DEFAULT">Mặc định</SelectItem>
                <SelectItem value="priceAsc">Giá giảm dần</SelectItem>
                <SelectItem value="priceDesc">Giá cao dần</SelectItem>
                <SelectItem value="ratingAsc">Đánh giá giảm dần</SelectItem>
                <SelectItem value="ratingDesc">Đánh giá cao dần</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mức giá */}
          <div className="space-y-2">
            <Label>Giá thuê theo ngày</Label>
            <Slider
              value={price}
              onValueChange={(val: number[]) => setPrice([val[0], val[1]])}
              max={10000000}
              step={50000}
              minStepsBetweenThumbs={1}
            />
            <div className="text-sm text-muted-foreground">
              {formatCurrency(price[0])} → {formatCurrency(price[1])}
            </div>
          </div>

          {/* Tuyển động */}
          <div className="space-y-2">
            <Label>Truyền động</Label>
            <RadioGroup
              value={transmissionType}
              onValueChange={setTransmissionType}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ALL" id="gear-all" />
                <Label htmlFor="gear-all">Tất cả</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="AUTOMATIC" id="gear-auto" />
                <Label htmlFor="gear-auto">Số tự động</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MANUAL" id="gear-manual" />
                <Label htmlFor="gear-manual">Số sàn</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Giới hạn số km
          <div className="space-y-2">
            <Label>Giới hạn số km</Label>
            <Slider
              value={kmLimit}
              onValueChange={setKmLimit}
              max={500}
              step={10}
            />
            <div className="text-sm text-muted-foreground">
              {kmLimit[0] === 0 ? "Bất kì" : `${kmLimit[0]} km`}
            </div>
          </div> */}

          {/* Khoảng cách */}
          {/* <div className="space-y-2">
            <Label>Khoảng cách</Label>
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={50}
              step={1}
            />
            <div className="text-sm text-muted-foreground">
              {distance[0] === 0 ? "Bất kì" : `${distance[0]} km`}
            </div>
          </div> */}

          {/* Số chỗ */}
          <div className="space-y-2">
            <Label>Số chỗ</Label>
            <Slider
              value={seat}
              onValueChange={(val: number[]) => setSeat([val[0], val[1]])}
              min={2}
              max={16}
              step={1}
              minStepsBetweenThumbs={1}
            />
            <div className="text-sm text-muted-foreground">
              {seat[0]} → {seat[1]} chỗ
            </div>
          </div>

          {/* Năm sản xuất */}
          <div className="space-y-2">
            <Label>Năm sản xuất</Label>
            <Slider
              value={year}
              onValueChange={setYear}
              max={2025}
              min={2000}
              step={1}
            />
            <div className="text-sm text-muted-foreground">
              {year[0] === 2000 ? "Bất kì" : `Sau năm ${year[0]}`}
            </div>
          </div>

          {/* Nhiên liệu */}
          <div className="space-y-2">
            <Label>Nhiên liệu</Label>
            <RadioGroup
              value={fuelType}
              onValueChange={setFuelType}
              className="flex flex-wrap gap-4"
            >
              {["Tất cả", "Xăng", "Dầu", "Điện", "Hybrid"].map((label, idx) => {
                const value = [
                  "ALL",
                  "GASOLINE",
                  "DIESEL",
                  "ELECTRIC",
                  "HYBRID",
                ][idx];
                return (
                  <div className="flex items-center space-x-2" key={value}>
                    <RadioGroupItem value={value} id={value} />
                    <Label htmlFor={value}>{label}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Mức tiêu thụ nhiên liệu */}
          <div className="space-y-2">
            <Label>Nhiên liệu tiêu hao</Label>
            <Slider
              value={fuelConsumption}
              onValueChange={setFuelConsumption}
              max={20}
              step={0.5}
            />
            <div className="text-sm text-muted-foreground">
              {fuelConsumption[0] === 0
                ? "Bất kì"
                : `Ít hơn ${fuelConsumption[0]} L/100km`}
            </div>
          </div>

          {/* Tính năng */}
          <div className="space-y-2">
            <Label>Tính năng</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {FEATURES.map((feature) => (
                <div
                  key={feature.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={feature.value}
                    checked={features.includes(feature.value)}
                    onCheckedChange={() => toggleFeature(feature.value)}
                  />
                  <Label htmlFor={feature.value}>{feature.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <Separator className="my-2" />
        <div className="flex justify-between">
          <Button variant="ghost" onClick={handleReset}>
            Đặt lại
          </Button>
          <Button onClick={handleFilter}>Lọc</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
