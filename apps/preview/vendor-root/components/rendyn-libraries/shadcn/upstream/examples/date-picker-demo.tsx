"use client";

import * as React from "react"
import { cn } from "cn"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/rendyn-libraries/shadcn/ui/button"
import { Calendar } from "@/components/rendyn-libraries/shadcn/upstream/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/rendyn-libraries/shadcn/upstream/ui/popover"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
