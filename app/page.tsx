"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/useAuth";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { user, getMyProfile, logout, isAuthenticated } = useAuthStore();
  useEffect(() => {
    const fetchUserProfile = async () => {
      await getMyProfile();
    };
    fetchUserProfile();
  }, []);

  const authenticated = isAuthenticated ? "Yes" : "No";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p className="text-lg text-gray-700">User: {user?.name}</p>
      <p className="text-lg text-gray-700">Email: {user?.email}</p>
      <p className="text-lg text-gray-700">Phone: {user?.phone}</p>
      <p className="text-lg text-gray-700">Date of birth: {user?.dob}</p>
      <p className="text-lg text-gray-700">Gender: {user?.gender}</p>
      {/* {user?.avatar && (
        <Image
          src={user.avatar}
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full"
        />
      )} */}
      <p className="text-lg text-gray-700">Authenticated: {authenticated}</p>
      <Button
        onClick={async () => {
          await logout();
          window.location.href = "/login";
        }}
        className="mt-4 bg-red-500 text-white"
      >
        Logout
      </Button>
    </div>
  );
}
