"use client";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserStore } from "@/stores/user.store";

type Props = {};

const UserNavItem = (props: Props) => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { user } = useUserStore();
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  useEffect(() => {
    setAvatarUrl(user?.avatar!);
  }, [user]);
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center px-2 cursor-pointer capitalize py-2 font-semibold text-sm hover:text-blue-500">
        <Avatar>
          <AvatarImage src={avatarUrl!} alt="Avatar" className="w-8 h-8" />
          <AvatarFallback className="w-8 h-8">
            {user?.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="ml-2">{user?.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            href="/profile/my-account"
            className="font-bold hover:text-blue-500"
          >
            Tài khoản của tôi
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={handleLogout}
            className="flex flex-1 font-bold bg-blue-500"
          >
            Đăng xuất
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavItem;
