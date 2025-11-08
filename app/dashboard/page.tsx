'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AddCourtInput, ApiResponse, ErrorResponse, Props, SessionsForm } from "@/type";
import { AxiosError } from "axios";
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { DatePickerProps } from "@/type";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { LuClock } from "react-icons/lu";
import { useState, useMemo } from "react";

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

const SLOT_TO_FIELD: Record<(typeof SLOTS)[number], keyof SessionsForm> = {
    "7 AM - 8 AM": "session_1",
    "8 AM - 9 AM": "session_2",
    "9 AM - 10 AM": "session_3",
    "10 AM - 11 AM": "session_4",
    "11 AM - 12 PM": "session_5",
    "12 PM - 1 PM": "session_6",
    "1 PM - 2 PM": "session_7",
    "2 PM - 3 PM": "session_8",
    "4 PM - 5 PM": "session_9",
};

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

function ToggleGroupSpacing({ values, setFieldValue }: Props) {
    const selected = useMemo(
        () =>
            SLOTS.filter((slot) => {
                const field = SLOT_TO_FIELD[slot];
                return Boolean(values[field]);
            }),
        [values]
    );

    const handleChange = (arr: string[]) => {
        SLOTS.forEach((slot) => {
            const field = SLOT_TO_FIELD[slot];
            const on = arr.includes(slot);
            setFieldValue(field, on, false);
        });
    };

    return (
        <ToggleGroup
            type="multiple"
            size="sm"
            value={selected}
            onValueChange={handleChange}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
        >
            {SLOTS.map((slot) => (
                <ToggleGroupItem
                    key={slot}
                    value={slot}
                    aria-label={`Select ${slot}`}
                    className="w-full justify-start border border-border rounded-md bg-background 
                 focus-visible:ring-0 focus-visible:ring-offset-0
                 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                >
                    <LuClock className="mr-1" />
                    {slot}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}

const Calendar28: React.FC<DatePickerProps> = ({ open, date, month, value, setOpen, setDate, setMonth, setValue }) => {
    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                Select Date
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

const DashboardPage = () => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [month, setMonth] = useState<Date | undefined>(date)
    const [value, setValue] = useState(formatDate(date))

    const accessToken = Cookies.get('accessToken') || "";

    const { mutate } = useMutation({
        mutationFn: async (data: AddCourtInput) => {
            const response = await axiosInstance.post("/court", data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            console.log(err.response?.data);
        },
        onSuccess: async (data) => {
            const res = data.data as ApiResponse;
            toast.success(res.message);
        },
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            image_url: "",
            price: 0,
            description: "",
            opening: "",
            session_1: false,
            session_2: false,
            session_3: false,
            session_4: false,
            session_5: false,
            session_6: false,
            session_7: false,
            session_8: false,
            session_9: false
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                values.opening = value
                console.log(values.opening);
                mutate(values);
            } finally {
                setSubmitting(false);
                formik.resetForm();
            }
        },
    });

    return (
        <div className="flex flex-col h-screen w-full justify-center">
            <h1 className="text-3xl font-bold text-start bg-[#FAFAFA] ms-65 me-65 p-5 rounded-md border mb-10">Add A Badminton Court</h1>
            <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit} className="ms-65 me-65 bg-[#FAFAFA] p-5 rounded-md border flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" placeholder="Name" className="bg-white" onChange={formik.handleChange} value={formik.values.name} name="name" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input type="text" placeholder="Image URL" className="bg-white" onChange={formik.handleChange} value={formik.values.image_url} name="image_url" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="price">Price /Jam</Label>
                    <Input type="number" placeholder="Price" className="bg-white" onChange={formik.handleChange} value={formik.values.price} name="price" />
                </div>
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
                <ToggleGroupSpacing
                    values={formik.values}
                    setFieldValue={formik.setFieldValue}
                />
                <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea className="bg-white" placeholder="Description" onChange={formik.handleChange} value={formik.values.description} name="description" />
                </div>
                <Button className="w-full mx-auto bg-blue-500 hover:bg-blue-600 cursor-pointer" type="submit">
                    {formik.isSubmitting ? <Spinner className="mr-1" /> : null}
                    Sign In
                </Button>
            </form>
        </div>
    )
}
export default DashboardPage
