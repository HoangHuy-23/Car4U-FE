import AccountInfo from "@/components/shared/profile/AccountInfo";
import DriverLicense from "@/components/shared/profile/DriverLicense";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-8">
      {/* card 1 */}
      <AccountInfo />
      {/* card 2 */}
      <DriverLicense />
    </div>
  );
}
