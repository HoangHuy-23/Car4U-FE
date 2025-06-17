"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateToStringWithoutTime } from "@/lib/dateFormat";
import { useUserStore } from "@/stores/user.store";
import { Link, Luggage, Star } from "lucide-react";
import { DialogEditAccount } from "../dialog/EditAccountDialog";
import DialogEditEmail from "../dialog/EditEmailDialog";
import DialogEditPhone from "../dialog/EditPhoneDialog";

export default function AccountInfo() {
  const { user } = useUserStore();

  return (
    <div className="bg-white rounded-xl flex flex-col px-5 py-5">
      {/* header */}
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold flex justify-center items-center">
          Thông tin tài khoản
          <DialogEditAccount />
        </span>
        <div className="border rounded-md flex px-4 py-2 items-center">
          <Luggage className="text-blue-500" width={30} height={30} />
          <span className="text-blue-500 font-bold text-xl mx-1">
            {user?.numOfTrips}
          </span>
          <span>chuyến</span>
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col sm:flex-row gap-8 py-4">
        {/* left */}
        <div className="flex flex-col justify-between items-center w-1/3">
          {/* <div className="bg-blue-300 text-xl w-32 h-32 text-white rounded-full border relative flex justify-center items-center">
            <span className="absolute">H</span>
          </div> */}
          <Avatar className="w-32 h-32">
            <AvatarFallback className="bg-blue-500 text-white text-2xl font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
            <AvatarImage src={user?.avatar ?? ""} alt="Avatar Image" />
          </Avatar>
          <h1 className="font-semibold">{user?.name}</h1>
          <div className="text-sm text-gray-500">
            Tham gia:{" "}
            {formatDateToStringWithoutTime(new Date(user?.createdAt || "")) ??
              "--/--/--"}
          </div>
          <div className="flex px-2 py-2 border rounded-md justify-center">
            {user?.rating === null || user?.rating==0 ? (
              <>
                <Star className="text-gray-400" />
                <span className="mx-2 font-bold text-sm">Chưa có đánh giá</span>
              </>
            ) : (
              <>
                <Star className="text-yellow-500" />
                <span className="mx-2 font-bold">{user?.rating}</span>
              </>
            )}
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col w-full gap-4">
          {/* dob */}
          <div className="border rounded-md bg-neutral-100 flex flex-col px-4 gap-4 py-4">
            <div className="flex justify-between">
              <p className="text-sm">Ngày sinh</p>
              <p>{`${
                user?.dob === null ? "--/--/--" : user?.dob.toString()
              }`}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Giới tính</p>
              <p>{`${user?.gender === "" ? "--/--/--" : user?.gender}`}</p>
            </div>
          </div>
          {/* contact */}
          <div className="flex flex-col gap-4 py-4">
            <div className="flex justify-between">
              <p className="text-sm">Số điện thoại</p>
              <div className="flex justify-center items-center">
                <p>{`${user?.phone === "" ? "--/--/--" : user?.phone}`}</p>
                <DialogEditPhone />
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Email</p>
              <div className="flex justify-center items-center">
                <p>{`${user?.email === null ? "--/--/--" : user?.email}`}</p>
                <DialogEditEmail />
              </div>
            </div>
            {/* <div className="flex justify-between">
              <p className="text-sm">Facebook</p>
              <div className="flex justify-center items-center">
                <p>{`${user?.facebookAccountId === null ? "--/--/--" : user?.facebookAccountId}`}</p>
                <Link width={16} height={16} className="ml-2 mr-1" />
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Google</p>
              <div className="flex justify-center items-center">
                <p>{`${user?.googleAccountId === null ? "--/--/--" : user?.googleAccountId}`}</p>
                <Link width={16} height={16} className="ml-2 mr-1" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
