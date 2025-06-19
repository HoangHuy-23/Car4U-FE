import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUserStore } from "@/stores/user.store";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export function DialogEditAccount() {
  const { user, updateInfo } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<string>(user?.dob as unknown as string);
  const [username, setUsername] = useState<string | undefined>(
    user?.name || "user"
  );
  const [gender, setGender] = useState<boolean | null>(
    user?.gender == "male" || true
  );

  useEffect(() => {
    if (isOpen) {
      setDate((user?.dob as unknown as string) || "");
      setUsername(user?.name || "");
      setGender(user?.gender == "male" || true);
    }
  }, [isOpen, user]);

  const handleGenderChange = (value: string) => {
    setGender(value === "male");
  };

  const handleSave = () => {
    const updatedInfo = {
      name: username ?? "",
      dob: new Date(date),
      gender: gender ? "male" : "female",
    };
    updateInfo(updatedInfo);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2 rounded-full px-2 py-2">
          <Pencil width={16} height={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="name" className="text-left col-span-2">
              Tên người người
            </Label>
            <Input
              id="name"
              defaultValue={username}
              className="col-span-4"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="dob" className="text-left col-span-2">
              Ngày sinh
            </Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="col-span-4 block"
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="username" className="text-left col-span-2">
              Giới tính
            </Label>
            <RadioGroup
              defaultValue={gender ? "male" : "female"}
              className="col-span-4 flex flex-row justify-around"
              onValueChange={handleGenderChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="r1" />
                <Label htmlFor="r1">Nam</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="r2" />
                <Label htmlFor="r2">Nữ</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-300"
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
