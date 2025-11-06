import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { axiosInstance } from "./lib/axios";


const getUserMe = async (accessToken: string) => {
    try {
        const headers: Record<string, string> = {
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await axiosInstance.get(`/users/@me`, {
            headers,
        });

        return response;
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;

    if (pathname === "/") {
        const data = await getUserMe(accessToken || "");
        if (!data) {
            request.cookies.delete("accessToken");
            return NextResponse.redirect(new URL("/login", request.url));
        }
        if (data.data.data.role === 'admin') {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    if (pathname === "/dashboard") {
        const data = await getUserMe(accessToken || "");
        if (!data) {
            request.cookies.delete("accessToken");
            return NextResponse.redirect(new URL("/login", request.url));
        }
        if (data.data.data.role === 'user') {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if (pathname === '/login' || pathname === '/register') {
        const data = await getUserMe(accessToken || "");
        if (!data) {
            const resp = NextResponse.next();
            resp.cookies.delete("accessToken");
            return resp;
        }
        if (data.data.data.role === 'user') {
            return NextResponse.redirect(new URL("/", request.url));
        }
        if (data.data.data.role === 'admin') {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/", "/dashboard/:path*"],
};