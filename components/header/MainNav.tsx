"use client";
import { useAuthStore } from "@/hooks/useAuth";
import Link from "next/link";
import React, { useEffect } from "react";
import UserNavItem from "./UserNavItem";

type Props = {};

const NavItem = [
  {
    id: 1,
    name: "About us",
    link: "/about",
  },
  {
    id: 2,
    name: "support",
    link: "/support",
  },
];

const MainNav = (props: Props) => {
  const { isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);
  }, [isAuthenticated, user]);
  return (
    <nav>
      <ul className="flex space-x-6 justify-center items-center">
        {NavItem.map((item) => (
          <li key={item.id} className="capitalize font-semibold text-foreground hover:text-primary text-sm">
            <Link href={item.link}>{item.name}</Link>
            </li>
        ))}
        {isAuthenticated ? (
          <UserNavItem />
        ) : (
          <li className="capitalize font-semibold text-foreground hover:text-primary text-sm">
            <Link href="/login">Log in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
