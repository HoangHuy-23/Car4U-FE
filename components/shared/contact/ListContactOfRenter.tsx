"use client";
import { useUserStore } from "@/stores/user.store";
import React, { useEffect } from "react";
import { RentalContactCard } from "./RentalContactCard";

type Props = {};

const ListContactOfRenter = (props: Props) => {
  const { myContact, getContactsByRenter } = useUserStore();
  useEffect(() => {
    getContactsByRenter();
  }, [getContactsByRenter]);
  return (
    <div className="grid grid-cols-1 gap-4">
      {myContact &&
        myContact.length > 0 &&
        myContact.map((contact, index) => (
          <RentalContactCard data={contact} key={index} />
        ))}
      {myContact && myContact.length === 0 && (
        <div className="col-span-4 text-center text-gray-500">
          Bạn chưa có hợp đồng nào. Hãy thêm hợp đồng của bạn!
        </div>
      )}
    </div>
  );
};

export default ListContactOfRenter;
