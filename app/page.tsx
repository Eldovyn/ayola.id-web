'use client'
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarIcon } from "lucide-react"
import { Court, CourtCardProps, DatePickerProps, CourtProps, CourtWithSessions } from "@/type";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { LuClock } from "react-icons/lu";
import { useGetCourt } from "@/services/court/get-court";
import Cookies from "js-cookie";
const SLOTS = [
  "7 AM - 8 AM",
  "8 AM - 9 AM",
  "9 AM - 10 AM",
  "10 AM - 11 AM",
  "11 AM - 12 PM",
  "12 PM - 1 PM",
  "1 PM - 2 PM",
  "2 PM - 3 PM",
  "4 PM - 5 PM",
] as const;

const SLOT_TO_FIELD = {
  "7 AM - 8 AM": "session_1",
  "8 AM - 9 AM": "session_2",
  "9 AM - 10 AM": "session_3",
  "10 AM - 11 AM": "session_4",
  "11 AM - 12 PM": "session_5",
  "12 PM - 1 PM": "session_6",
  "1 PM - 2 PM": "session_7",
  "2 PM - 3 PM": "session_8",
  "4 PM - 5 PM": "session_9",
} as const satisfies Record<(typeof SLOTS)[number], keyof CourtWithSessions>;

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

const ToggleGroupSpacing: React.FC<CourtProps> = ({ court }) => {
  console.log(court);

  const [value, setValue] = useState<string[]>([]);

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      size="sm"
      value={value}
      onValueChange={setValue}
      spacing={2}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
    >
      {SLOTS.map((slot) => {
        const field = SLOT_TO_FIELD[slot];
        const available = court[field];
        return (
          <ToggleGroupItem
            key={slot}
            value={slot}
            disabled={!available}
            aria-label={`Select ${slot}`}
            className="w-full justify-start data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
          >
            <LuClock className="mr-1" />
            {slot}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}

const Calendar28: React.FC<DatePickerProps> = ({ open, date, month, value, setOpen, setDate, setMonth, setValue }) => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Booking Date
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            setValue(e.target.value);
            const dt = e.target.valueAsDate;
            setDate(dt ?? new Date());
            setMonth(dt ? new Date(dt.getFullYear(), dt.getMonth(), 1) : new Date());
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date)
                setValue(formatDate(date))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

const VenueCard: React.FC<CourtCardProps> = ({ court, open, date, month, value, setOpen, setDate, setMonth, setValue }) => {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={court.image_url}
          alt={court.name}
          width={400}
          height={400}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-black/0 to-transparent opacity-70" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-800 shadow ring-1 ring-black/5 backdrop-blur-sm dark:bg-zinc-800/80 dark:text-zinc-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M11.48 3.499a.75.75 0 0 1 1.04 0l7 7a.75.75 0 1 1-1.06 1.06l-.96-.96V19.5a2.25 2.25 0 0 1-2.25 2.25H8.25A2.25 2.25 0 0 1 6 19.5V10.6l-.96.96a.75.75 0 0 1-1.06-1.06l7-7Z" />
          </svg>
          {formatIDR(court.price)}/jam
        </span>
      </div>


      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {court.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {court.description}
        </p>


        <div className="mt-auto flex items-center justify-between pt-2">
          <Dialog>
            <DialogTrigger
              type="button"
              className="inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 active:scale-[0.98] bg-indigo-600 hover:bg-indigo-500"
              aria-label={`Booking ${court.name}`}
            >
              Booking
            </DialogTrigger>
            <DialogContent className="max-w-none! w-[38vw]!">
              <DialogHeader>
                <DialogTitle>{`Booking ${court.name}`}</DialogTitle>
                <DialogDescription>
                  {court.description}
                </DialogDescription>
              </DialogHeader>
              <Image src={court.image_url} alt={court.name} width={400} height={400} className="w-full aspect-video object-cover rounded-md" />
              <Calendar28 open={open}
                setOpen={setOpen}
                date={date}
                setDate={setDate}
                month={month}
                setMonth={setMonth}
                value={value}
                setValue={setValue} />
              <Label htmlFor="date" className="px-1">
                Select Time
              </Label>
              <ToggleGroupSpacing court={court} />
              <Button className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer">Booking</Button>
            </DialogContent>
          </Dialog>
          <button
            type="button"
            className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none dark:hover:bg-zinc-800"
            aria-label="Simpan ke favorit"
            title="Simpan ke favorit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M11.645 20.91l-.007-.003-.022-.01a15.247 15.247 0 0 1-.383-.177 25.18 25.18 0 0 1-4.244-2.59C4.688 16.001 2.25 13.298 2.25 9.75 2.25 7.126 4.289 5 6.833 5A4.64 4.64 0 0 1 12 7.01 4.64 4.64 0 0 1 17.167 5C19.711 5 21.75 7.126 21.75 9.75c0 3.549-2.438 6.252-4.739 8.38a25.175 25.175 0 0 1-4.244 2.59 15.247 15.247 0 0 1-.383.177l-.022.01-.007.003-.003.001a.75.75 0 0 1-.61 0l-.003-.001Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};


export default function Home() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date | undefined>(date)
  const [value, setValue] = useState(formatDate(date))
  const searchParams = useSearchParams();

  const currentPage = searchParams.get('currentPage') || "1";
  const accessToken = Cookies.get('accessToken') || ''

  const { data } = useGetCourt(accessToken, currentPage);

  return (
    <>
      <div className="flex flex-col gap-10 min-h-screen w-full pt-10">
        <div className="flex justify-end items-start w-full pt-20 pe-8">
          <div className="relative w-72">
            <Input type="search" placeholder="Search" className="pr-10" />
            <IoSearchOutline
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
              size={18}
              aria-hidden
            />
          </div>
        </div>
        <section className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ps-8 pe-8">
          {data?.data.map((v: Court) => (
            <VenueCard key={v.id} court={v} open={open} date={date} month={month} value={value} setOpen={setOpen} setDate={setDate} setMonth={setMonth} setValue={setValue} />
          ))}
        </section>
        <br />
      </div>
    </>
  );
}
