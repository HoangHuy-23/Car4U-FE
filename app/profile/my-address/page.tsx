"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import { UserAddress } from "@/types/user.type";
import { Bookmark, Building2, Home, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {};

const MyAddress = (props: Props) => {
  const [id, setId] = useState<string | undefined>(undefined);
  const [isDefault, setIsDefault] = useState<boolean>(true);
  const [type, setType] = useState<string>("");
  const [remindName, setRemindName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [street, setStreet] = useState<string>("");

  const [addNew, setAddNew] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [address, setAddress] = useState<UserAddress>();
  const [home, setHome] = useState(false);
  const [office, setOffice] = useState(false);
  const [other, setOther] = useState(false);
  const { user, isLoading, error } = useUserStore();

  useEffect(() => {
    setAddress(user?.addresses?.at(0));
  }, [user]);
  const { addAddress, updateAddress, makeAddressDefault, deleteAddress } =
    useUserStore();

  const handleInitDataEdit = (address: UserAddress) => {
    setId(address.id);
    setIsDefault(address.isDefault);
    setType(address.type);
    setRemindName(address.reminder);
    setCity(address.city);
    setWard(address.ward);
    setDistrict(address.district);
    setStreet(address.street);
  };

  const handleClearForm = () => {
    setIsDefault(false);
    setType("");
    setRemindName("");
    setCity("");
    setWard("");
    setDistrict("");
    setStreet("");
  };

  useEffect(() => {
    if (edit && address) {
      handleInitDataEdit(address);
    }
  }, [edit, address]);

  const handleSave = () => {
    const userAddress: UserAddress = {
      reminder: remindName,
      no: "",
      city: city,
      district: district,
      ward: ward,
      street: street,
      isDefault: isDefault,
      coordinates: [],
      type: type,
    };
    addAddress(userAddress);
    // refetch();
    console.log(userAddress);
  };

  const handleUpdate = () => {
    const userAddress: UserAddress = {
      id: id,
      reminder: remindName,
      city: city,
      district: district,
      ward: ward,
      street: street,
      coordinates: [],
      isDefault: isDefault,
      no: "",
      type: type,
    };
    updateAddress(id as string, userAddress);
    //refetch();
  };

  const typeHomeChange = () => {
    if (home) {
      setHome(false);
      setType("");
    } else {
      setHome(true);
      setOffice(false);
      setOther(false);
      setType("HOME");
    }
  };

  const typeOfficeChange = () => {
    if (office) {
      setOffice(false);
      setType("");
    } else {
      setOffice(true);
      setHome(false);
      setOther(false);
      setType("OFFICE");
    }
  };

  const typeOtherChange = () => {
    if (other) {
      setOther(false);
      setType("");
    } else {
      setOther(true);
      setHome(false);
      setOffice(false);
      setType("OTHER");
    }
  };

  const typeAddressDefault = (type: string) => {
    switch (type) {
      case "HOME":
        setHome(true);
        break;
      case "OFFICE":
        setOffice(true);
        break;
      default:
        setOther(true);
        break;
    }
  };

  const iconChange = (type: string) => {
    switch (type) {
      case "HOME":
        return <Home className="mr-2" />;
      case "OFFICE":
        return <Building2 className="mr-2" />;
      default:
        return <Bookmark className="mr-2" />;
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Địa chỉ của tôi</h1>
      <div className="bg-white rounded-xl flex flex-col px-10 py-10 gap-8">
        {addNew || edit ? (
          <>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-semibold">
                {edit ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
              </span>
              {edit && (
                <div
                  className="text-red-500 border-red-500 rounded-lg border p-2 cursor-pointer"
                  onClick={() => {
                    deleteAddress(id as string);
                    setEdit(false);
                    setAddNew(false);
                    setHome(false);
                    setOffice(false);
                    setOther(false);
                    handleClearForm();
                  }}
                >
                  <Trash2 />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span>Loại địa điểm</span>
                <div className="flex items-center gap-2">
                  <span>Đặt làm địa chỉ mặc định</span>
                  <Switch
                    checked={isDefault}
                    onClick={() => {
                      if (isDefault) {
                        setIsDefault(false);
                      } else {
                        setIsDefault(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  className={`rounded-lg flex justify-center items-center p-2 border gap-2 cursor-pointer ${
                    home && "bg-blue-100"
                  }`}
                  onClick={typeHomeChange}
                >
                  <Home />
                  <span>Nhà riêng</span>
                </div>

                <div
                  className={`rounded-lg flex justify-center items-center p-2 border gap-2 cursor-pointer ${
                    office && "bg-blue-100"
                  }`}
                  onClick={typeOfficeChange}
                >
                  <Building2 />
                  <span>Công ty</span>
                </div>

                <div
                  className={`rounded-lg flex justify-center items-center p-2 border gap-2 cursor-pointer ${
                    other && "bg-blue-100"
                  }`}
                  onClick={typeOtherChange}
                >
                  <Bookmark />
                  <span>Khác</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span>Tên gợi nhớ</span>
              <Input
                placeholder="Nhập tên cho địa chỉ của bạn"
                defaultValue={`${edit ? `${remindName}` : ""}`}
                onChange={(e) => {
                  setRemindName(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <span>Thành phố</span>
                <Input
                  placeholder="Chọn thành phố"
                  defaultValue={`${edit ? `${city}` : ""}`}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span>Quận / Huyện</span>
                <Input
                  placeholder="Chọn thành phố"
                  defaultValue={`${edit ? `${ward}` : ""}`}
                  onChange={(e) => {
                    setWard(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span>Phường / Xã</span>
                <Input
                  placeholder="Chọn thành phố"
                  defaultValue={`${edit ? `${district}` : ""}`}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span>Địa chỉ</span>
              <Input
                placeholder="Nhập tên đường / tòa nhà"
                defaultValue={`${edit ? `${street}` : ""}`}
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant={"outline"}
                onClick={() => {
                  setAddNew(false);
                  setEdit(false);
                  setHome(false);
                  setOffice(false);
                  setOther(false);
                  handleClearForm();
                }}
              >
                Hủy
              </Button>
              {edit ? (
                <Button
                  variant={"default"}
                  className="bg-blue-500 hover:bg-blue-300"
                  onClick={() => {
                    handleUpdate();
                    setEdit(false);
                    setHome(false);
                    setOffice(false);
                    setOther(false);
                    handleClearForm();
                  }}
                >
                  Cập nhật
                </Button>
              ) : (
                <Button
                  variant={"default"}
                  className="bg-blue-500 hover:bg-blue-300"
                  onClick={() => {
                    handleSave();
                    setAddNew(false);
                    setHome(false);
                    setOffice(false);
                    setOther(false);
                    handleClearForm();
                  }}
                >
                  Xác nhận
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            {/* <div className="bg-white rounded-xl flex flex-col px-5 py-5 gap-8"> */}
            {/* header */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Địa chỉ đã lưu</span>
              <div
                className="border rounded-md flex px-3 py-3 items-end hover:bg-slate-100 hover:shadow-md"
                onClick={() => {
                  setAddNew(true);
                }}
              >
                <span className="font-normal cursor-pointer">
                  Thêm địa chỉ mới
                </span>
              </div>
            </div>
            {/* address current */}
            {user?.addresses?.map((address) => (
              <div
                className={`flex border rounded-lg justify-between items-center px-4 ${
                  address.isDefault && "border-blue-500 bg-blue-50"
                }`}
                key={address.id}
              >
                <div className="flex justify-center items-center gap-2">
                  {iconChange(address.type)}
                  <div className="flex flex-col justify-center py-2 gap-2">
                    <div className="flex gap-2">
                      <h1 className="font-semibold">{address.reminder}</h1>
                      {address.isDefault && (
                        <div className="rounded-full bg-blue-500 text-sm flex justify-center items-center px-2 text-white">
                          Mặc định
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {address.street},{address.district},{address.ward} ,
                      {address.city}
                    </p>
                  </div>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setEdit(true);
                    setAddress(address);
                    typeAddressDefault(address.type);
                    handleInitDataEdit(address);
                  }}
                >
                  <Pencil />
                </div>
              </div>
            ))}

            {/* <div className="flex border rounded-lg justify-between items-center px-2">
              <div className="flex justify-center items-center">
                <Home className="mr-2" />
                <div className="flex flex-col justify-center py-2">
                  <h1 className="font-semibold">Home</h1>
                  <p className="text-gray-600 text-sm">
                    27/A, 4 district, Go Vap ward, Ho Chi Minh city, Vietnam
                  </p>
                </div>
              </div>
              <Pencil />
            </div>

            <div className="flex border rounded-lg justify-between items-center px-2">
              <div className="flex justify-center items-center">
                <Home className="mr-2" />
                <div className="flex flex-col justify-center py-2">
                  <h1 className="font-semibold">Home</h1>
                  <p className="text-gray-600 text-sm">
                    27/A, 4 district, Go Vap ward, Ho Chi Minh city, Vietnam
                  </p>
                </div>
              </div>
              <Pencil />
            </div> */}
            {/* </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default MyAddress;
