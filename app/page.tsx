"use client";
import Head from "next/head";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/hooks/useAuth";
import Hero from "@/components/shared/homepage/Hero";
import SearchBar from "@/components/shared/homepage/SearchBar";

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
  });

  const { user } = useAuthStore();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching with:", searchParams);
  };

  // Dữ liệu xe với đường dẫn hình ảnh (đặt trong thư mục public)
  const cars = [
    {
      name: "Toyota Camry",
      price: "500.000 VNĐ/ngày",
      image: "/cars/toyota-camry.jpg",
    },
    {
      name: "Honda CR-V",
      price: "600.000 VNĐ/ngày",
      image: "/cars/honda-crv.jpg",
    },
    {
      name: "Mazda 3",
      price: "450.000 VNĐ/ngày",
      image: "/cars/mazda-3.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Car4U - Thuê xe tự lái</title>
        <meta name="description" content="Hệ thống thuê xe tự lái Car4U" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      {/* Main content */}
      <main className="flex-1 container mx-auto py-10">
        <section className="flex flex-col gap-12">
          <SearchBar />
        </section>

        {/* Giới thiệu */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-bold mb-4">About Car4U</h2>
            <p className="text-gray-600">
              Car4U is the leading self-drive car rental system, bringing you a
              convenient and comfortable driving experience. With a variety of
              vehicles and 24/7 support services, we are always ready to
              accompany you on every journey.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-bold mb-4">Car4U</h5>
              <p className="text-primary-foreground">
                Your trusted partner in car rental services
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">About Us</h6>
              <ul className="space-y-2 text-primary-foreground">
                <li>Our Story</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Support</h6>
              <ul className="space-y-2 text-primary-foreground">
                <li>FAQ</li>
                <li>Help Center</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Legal</h6>
              <ul className="space-y-2 text-primary-foreground">
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-foreground text-center">
            <p className="text-primary-foreground">
              © {new Date().getFullYear()} Car4U. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
