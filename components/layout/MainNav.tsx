"use client";
import { useAuthStore } from "@/stores/auth.store";
import Link from "next/link";
import React, { useEffect } from "react";
import UserNavItem from "./UserNavItem";
import { useUserStore } from "@/stores/user.store";
import { BotMessageSquare } from "lucide-react";

type Props = {};

const NavItem = [
  {
    id: 1,
    name: "Về chúng tôi",
    link: "/about",
  },
  {
    id: 2,
    name: "Hỗ trợ",
    link: "/support",
  },
];

const MainNav = (props: Props) => {
  const { isAuthenticated } = useAuthStore();
  const { user } = useUserStore();
  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);
  }, [isAuthenticated, user]);
  return (
    <nav>
      <ul className="flex space-x-6 justify-center items-center">
        {NavItem.map((item) => (
          <li
            key={item.id}
            className="capitalize font-semibold text-foreground hover:text-primary text-sm"
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
        <li className="capitalize font-semibold text-foreground hover:text-primary text-sm">
          <Link href="/chatbot" className="flex items-center gap-1">
            <BotMessageSquare /> bot
          </Link>
        </li>
        {isAuthenticated ? (
          <UserNavItem />
        ) : (
          <li className="capitalize font-semibold text-foreground hover:text-primary text-sm">
            <Link href="/login">Đăng nhập</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
