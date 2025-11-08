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

declare interface Court {
    created_at: string;
    deleted_at: string;
    description: string;
    id: string;
    image_url: string;
    name: string;
    price: number;
    updated_at: string;
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
    opening: string;
    session_1: boolean;
    session_2: boolean;
    session_3: boolean;
    session_4: boolean;
    session_5: boolean;
    session_6: boolean;
    session_7: boolean;
    session_8: boolean;
    session_9: boolean;
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

declare interface Link {
    next: number | null;
    prev: number | null;
}

declare interface Page {
    current_page: number;
    has_next: boolean;
    has_prev: boolean;
    per_page: number;
    total_items: number;
    total_pages: number;
}

declare interface ApiGetCourtsResponse {
    data: Court[];
    link: Link;
    message: string | null;
    page: Page
}

declare type SessionsForm = {
    session_1: boolean;
    session_2: boolean;
    session_3: boolean;
    session_4: boolean;
    session_5: boolean;
    session_6: boolean;
    session_7: boolean;
    session_8: boolean;
    session_9: boolean;
};

declare type Props = {
    values: SessionsForm;
    setFieldValue: (field: string, value: string | number | boolean, shouldValidate?: boolean) => void;
};