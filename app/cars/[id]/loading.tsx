import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-gray-500 mx-auto mt-20" />
    </div>
  );
};

export default loading;
