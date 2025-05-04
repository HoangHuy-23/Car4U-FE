import Link from "next/link";
import React from "react";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href={"/"}
          className="text-3xl font-bold tracking-tight text-primary"
        >
          Car4U
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:flex">
          <MainNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
