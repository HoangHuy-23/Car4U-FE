"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GoogleLoginCallBack = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loginSocialCallback, error } = useAuthStore();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      loginSocialCallback("google", code);
    }
  }, [searchParams, loginSocialCallback]);

  useEffect(() => {
    if (error) {
      router.push("/login");
    }
  }, [error, router]);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-primary w-full text-center mt-20">
        Login with Google
      </h1>
    </div>
  );
};

export default GoogleLoginCallBack;
