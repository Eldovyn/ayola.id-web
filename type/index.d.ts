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

declare interface Place {
    id: string;
    name: string;
    description?: string;
    image?: string;
    numberOfCourts?: number;
    pricePerHour?: number;
};

declare interface RegitserInput {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    provider: string;
};

declare interface LoginInput {
    email: string;
    password: string;
    provider: string;
};

declare interface AddCourtInput {
    name: string;
    image_url: string;
    description: string;
    price: number;
};

declare interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
    data?: {
        [field: string]: string[];
    };
    token?: {
        [field: string]: string[];
    };
}

declare interface ApiResponse {
    data?: Token | User;
    message: string;
    user: User;
    errors?: {
        [field: string]: string[];
    };
    token?: {
        [field: string]: string;
    };
}