"use client";
import Head from "next/head";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth.store";
import Hero from "@/components/shared/homepage/Hero";
import SearchBar from "@/components/shared/homepage/SearchBar";
import { useUserStore } from "@/stores/user.store";

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
  });

  const { user } = useUserStore();

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
            <h2 className="text-2xl font-bold mb-4">Về Car4U</h2>
            <p className="text-gray-600">
              Car4u là hệ thống cho thuê xe tự lái hàng đầu, mang đến cho bạn
              một Trải nghiệm lái xe thuận tiện và thoải mái. Với nhiều loại
              phương tiện và dịch vụ hỗ trợ 24/7, chúng tôi luôn sẵn sàng đi
              cùng bạn trên mỗi hành trình.
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
                Đối tác đáng tin cậy của bạn trong các dịch vụ cho thuê xe hơi
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Về chúng tôi</h6>
              <ul className="space-y-2 text-primary-foreground">
                <li>Câu chuyện của chúng tôi</li>
                <li>Tuyển dụng</li>
                <li>Liên hệ</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Hỗ trợ</h6>
              <ul className="space-y-2 text-primary-foreground">
                <li>FAQ</li>
                <li>Trung tâm tư vấn</li>
                <li>Điều khoản dịch vụ</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Chính sách</h6>
              <ul className="space-y-2 text-primary-foreground">
                <li>Chính sách bảo mật</li>
                <li>Chính sách cookie</li>
                <li>Bảo vệ</li>
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
