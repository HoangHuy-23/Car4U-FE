import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Menu } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

type Props = {}

const MobileNav = (props: Props) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-blue-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          <span>Welcom to CarRantals!</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          <Button className="flex-1 font-bold bg-blue-500">Log in</Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav