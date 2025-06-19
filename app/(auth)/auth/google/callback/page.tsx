import { Suspense } from "react";
import GoogleLoginCallBack from "./GoogleLoginCallBack";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="text-center mt-20">Đang đăng nhập...</div>}
    >
      <GoogleLoginCallBack />
    </Suspense>
  );
}
