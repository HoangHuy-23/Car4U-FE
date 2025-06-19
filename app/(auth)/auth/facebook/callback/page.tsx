import { Suspense } from "react";
import FacebookLoginCallBack from "./FacebookLoginCallBack";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Đang đăng nhập Facebook...</div>}>
      <FacebookLoginCallBack />
    </Suspense>
  );
}
