import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import React from "react";


export default function DialogEditEmail() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="ml-2 px-1 py-1">
          <Pencil width={16} height={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit email</DialogTitle>
        </DialogHeader>
        <Input id="name" placeholder="Input email" className="" />
        <DialogFooter>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-300">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
