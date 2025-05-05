"use client";
import React, { useEffect, useState } from "react";

import { Car as CarIcon, ChevronDown, Circle, User } from "lucide-react";
import { Car } from "@/types/car.type";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  data: Car | null;
};

export default function AddressRentalInformationDialog({ data }: Props) {
  const [selectedCarAddress, setSelectedCarAddress] = useState(false);
  const [selectedCusAddress, setSelectedCusAddress] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {}, []);

  const handleSelect = () => {
    if (selectedCarAddress) {
      setSelectedCarAddress(false);
      setSelectedCusAddress(true);
    }
    if (selectedCusAddress) {
      setSelectedCarAddress(true);
      setSelectedCusAddress(false);
    }
  };
  const handleSave = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="border rounded-md bg-white">
          <div className="flex flex-col p-3 w-full">
            <label htmlFor="" className="text-left">
              Địa điểm giao nhận xe
            </label>
            <div className="flex justify-between">
              <span>
                {data?.location.district}, {data?.location.city}
              </span>

              <ChevronDown />
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-center">Địa chỉ</DialogTitle>
        </DialogHeader>
        <div id="body" className="flex justify-center gap-4">
          <div className="w-[45%]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501726.54070584546!2d106.36557809299185!3d10.75461814738396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1720879582189!5m2!1svi!2s"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[240px] mb-3 rounded-md"
            ></iframe>
            <h1 className="text-xl font-bold">Giao xe nhận xe tận nơi</h1>
            <p className="text-xs">
              Chủ xe sẽ giao và nhận xe đến tận nhà hoặc địa chỉ mà bạn lựa chọn
              trên ứng dụng CarRental
            </p>
            <div className="flex justify-between mt-4">
              <p className=" font-semibold text-gray-500">
                Giao nhận xe tận nơi trong
              </p>
              <p className=" font-semibold">30 km</p>
            </div>
            <div className="flex justify-between mt-4">
              <p className=" font-semibold text-gray-500">
                Phí giao nhận xe (2 chiều)
              </p>
              <p className=" font-semibold">30 000đ/km</p>
            </div>
          </div>
          <div className="w-[55%] flex flex-col gap-2">
            {/* car address */}
            <div
              onClick={handleSelect}
              className={`border rounded-md flex p-2 gap-2 ${
                selectedCarAddress && "border-blue-500 bg-blue-50"
              }`}
            >
              <div
                className={`border-[2px] rounded-full w-5 h-5 mt-1 flex justify-center items-center ${
                  selectedCarAddress && "border-blue-500"
                }`}
              >
                <div
                  className={`rounded-full w-3 h-3 bg-blue-500 ${
                    selectedCarAddress ? "block" : "hidden"
                  }`}
                ></div>
              </div>
              <div className="w-[90%] flex flex-col gap-2">
                <h1 className="font-semibold text-gray-500">
                  Nhận xe tại vị trí xe
                </h1>
                <span className="flex text-sm items-center gap-2">
                  <CarIcon /> {data?.location.district}, {data?.location.city}
                </span>
                <p className="text-gray-500 text-sm">
                  Bạn sẽ nhận và trả xe tại vị trí xe (địa chỉ cụ thể sẽ được
                  hiển thị sau khi đặt cọc)
                </p>
              </div>
            </div>
            {/* user address */}
            {/* {isAuthenticated && (
              <div
                onClick={handleSelect}
                className={`border rounded-md flex p-2 gap-2 ${
                  selectedCusAddress && "border-blue-500 bg-blue-50"
                }`}
              >
                <div
                  className={`border-[2px] rounded-full w-5 h-5 mt-1 flex justify-center items-center ${
                    selectedCusAddress && "border-blue-500"
                  }`}
                >
                  <div
                    className={`rounded-full w-3 h-3 bg-blue-500 ${
                      selectedCusAddress ? "block" : "hidden"
                    }`}
                  ></div>
                </div>
                <div className="w-[90%] flex flex-col gap-2">
                  <h1 className="font-semibold text-gray-500">
                    Địa chỉ của tôi
                  </h1>
                  <span className="flex text-sm items-start gap-2">
                    <User /> {user?.addresses.at(0)?.street},{" "}
                    {user?.addresses.at(0)?.district},{" "}
                    {user?.addresses.at(0)?.ward}, {user?.addresses.at(0)?.city}
                  </span>
                </div>
              </div>
            )} */}
          </div>
        </div>
        <DialogFooter className="">
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-300"
            onClick={handleSave}
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
