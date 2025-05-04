"use client"
import { CalendarIcon, MapPin, Car, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export function CarFilters() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="bg-white p-4 rounded-md shadow mb-6 space-y-4">
      {/* Location & Date */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <MapPin className="text-gray-500" size={18} />
          <Input placeholder="TP. Hồ Chí Minh" className="w-48" />
        </div>

        <div className="flex items-center gap-2">
          <CalendarIcon className="text-gray-500" size={18} />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-64 justify-start text-left font-normal">
                {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">Loại xe</Badge>
        <Badge variant="outline">Hãng xe</Badge>
        <Badge variant="outline">Chủ xe 5*</Badge>
        <Badge variant="outline">Giao xe tận nơi</Badge>
        <Badge variant="outline">Thuê giờ</Badge>
        <Badge variant="outline">Đặt xe nhanh</Badge>
        <Badge variant="outline">Miễn thế chấp</Badge>
        <Badge variant="outline">Giảm giá</Badge>
      </div>
    </div>
  )
}
