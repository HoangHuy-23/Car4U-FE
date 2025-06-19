"use client";
import ListMyCar from "@/components/shared/profile/ListMyCar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

type Props = {};

const MyCar = (props: Props) => {
  const [activeTab, setActiveTab] = useState("car-list");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Xe của tôi</h1>
      <div>
        <Tabs
          defaultValue="car-list"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 bg-neutral-100">
            {" "}
            {/* Adjust grid-cols based on your number of items */}
            <TabsTrigger value="car-list">Danh sách xe</TabsTrigger>
            <TabsTrigger value="history">Lịch xe</TabsTrigger>
            <TabsTrigger value="gps">GPS</TabsTrigger>
            <TabsTrigger value="car-registration">Đăng ký xe</TabsTrigger>
            <TabsTrigger value="sample-contract">Hợp đồng mẫu</TabsTrigger>
          </TabsList>

          {/* Optional: You can add TabContent if you want to display different content based on the active tab */}

          <TabsContent value="car-list">
            <ListMyCar />
          </TabsContent>
          <TabsContent value="history">
            <div className="justify-center items-center flex flex-col h-full w-full min-h-[300px]">
              <p>Chức năng này đang được phát triển.</p>
              <p>Vui lòng quay lại sau.</p>
            </div>
          </TabsContent>
          <TabsContent value="gps">
            <div className="justify-center items-center flex flex-col h-full w-full min-h-[300px]">
              <p>Chức năng này đang được phát triển.</p>
              <p>Vui lòng quay lại sau.</p>
            </div>
          </TabsContent>
          <TabsContent value="car-registration">
            <div className="justify-center items-center flex flex-col h-full w-full min-h-[300px]">
              <p>Chức năng này đang được phát triển.</p>
              <p>Vui lòng quay lại sau.</p>
            </div>
          </TabsContent>
          <TabsContent value="sample-contract">
            <div className="justify-center items-center flex flex-col h-full w-full min-h-[300px]">
              <p>Chức năng này đang được phát triển.</p>
              <p>Vui lòng quay lại sau.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyCar;
