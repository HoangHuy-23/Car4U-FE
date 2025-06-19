import { Suspense } from "react";
import PaymentCallback from "./PaymentCallback";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="text-center mt-20">Đang xử lý thanh toán...</div>
      }
    >
      <PaymentCallback />
    </Suspense>
  );
}
