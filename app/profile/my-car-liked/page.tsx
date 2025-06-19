"use client";
import ListMyFavoriteCars from "@/components/shared/profile/ListMyFavoriteCars";
import { useUserStore } from "@/stores/user.store";
import React, { useEffect } from "react";

type Props = {};

const MyCarLiked = (props: Props) => {
  const { likedCars, getLikedCars } = useUserStore();
  useEffect(() => {
    getLikedCars();
  }, [getLikedCars]);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Xe yêu thích</h1>
      <ListMyFavoriteCars />
    </div>
  );
};

export default MyCarLiked;
