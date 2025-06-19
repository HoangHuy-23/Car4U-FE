"use client";
import {
  Car,
  CarFront,
  Heart,
  Lock,
  LockKeyhole,
  MapPin,
  Trash2,
  User,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

const listNav = [
  {
    href: "/profile/my-account",
    label: "Tài khoản của tôi",
    icon: <User />,
  },
  {
    href: "/profile/my-car-liked",
    label: "Xe yêu thích",
    icon: <Heart />,
  },
  {
    href: "/profile/my-car",
    label: "Xe của tôi",
    icon: <Car />,
  },
  {
    href: "/profile/my-booking",
    label: "Chuyến của tôi",
    icon: <CarFront />,
  },
  {
    href: "/profile/my-address",
    label: "Địa chỉ của tôi",
    icon: <MapPin />,
  },
  {
    href: "/profile/change-password",
    label: "Đổi mật khẩu",
    icon: <LockKeyhole />,
  },
  {
    href: "/profile/delete-account",
    label: "Yêu cầu xóa tài khoản",
    icon: <Trash2 />,
  },
];

export default function ProfileNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col mr-4">
      <h1 className="text-3xl font-serif font-semibold mb-6 text-zinc-700">
        Xin chào!
      </h1>
      <ul>
        {listNav.map((nav) => (
          <li key={nav.href} className="hover:bg-neutral-200">
            <Link href={nav.href}>
              <Separator />
              <div className="relative">
                {pathname === nav.href && (
                  <div className="bg-blue-500 w-1 absolute h-[90%] left-0 top-0 my-1"></div>
                )}
                <p className="font-sans text-zinc-700 py-4 px-4 flex gap-2">
                  {nav.icon}
                  {nav.label}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
