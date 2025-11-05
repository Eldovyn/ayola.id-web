import type { Dispatch, SetStateAction } from "react";

declare interface Venue {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
}

declare interface VenueCardProps {
    venue: Venue;
    open: boolean;
    date?: Date;
    month?: Date;
    value: string;

    setOpen: Dispatch<SetStateAction<boolean>>;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
    setMonth: Dispatch<SetStateAction<Date | undefined>>;
    setValue: Dispatch<SetStateAction<string>>;
}

declare interface DatePickerProps {
    open: boolean;
    date?: Date;
    month?: Date;
    value: string;

    setOpen: Dispatch<SetStateAction<boolean>>;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
    setMonth: Dispatch<SetStateAction<Date | undefined>>;
    setValue: Dispatch<SetStateAction<string>>;
}