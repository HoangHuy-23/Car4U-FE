"use client";
import ListContactOfRenter from "@/components/shared/contact/ListContactOfRenter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

type Props = {};

const MyBookingPage = (props: Props) => {
  const [activeTab, setActiveTab] = useState("trip-list");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chuyến của tôi</h1>
      <div>
        <Tabs
          defaultValue="trip-list"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 bg-neutral-100">
            {" "}
            {/* Adjust grid-cols based on your number of items */}
            <TabsTrigger value="trip-list">Chuyến hiện tại</TabsTrigger>
            <TabsTrigger value="history">Lịch sử chuyến</TabsTrigger>
          </TabsList>

          {/* Optional: You can add TabContent if you want to display different content based on the active tab */}

          <TabsContent value="trip-list">
            <ListContactOfRenter />
          </TabsContent>
          <TabsContent value="history">
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

export default MyBookingPage;
