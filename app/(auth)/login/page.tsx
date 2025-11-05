'use client';
import Image from "next/image";
import IconApp from "@/public/icon/icon-ayola_id.png";
import IconGoogle from "@/public/icon/icon-google.png";
import IconFacebook from "@/public/icon/icon-facebook.png";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { IoEyeOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PageLogin() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex h-screen bg-[#282828]">
            <div className="flex-1 flex items-center justify-center bg-[#282828]">
                <Image
                    src={IconApp}
                    alt="logo-trenalyze"
                    width={600}
                    height={600}
                    className="mb-4"
                    priority
                />
            </div>

            <div className="flex-1 flex flex-col justify-center bg-[#EEF1F7]">
                <form action="" className="w-full mx-auto mt-8 flex flex-col gap-4">
                    <h1 className="text-3xl font-semibold ms-40 me-40">Sign in your account</h1>
                    <div className="flex flex-row gap-10 ms-40 me-40">
                        <div className="border-2 flex items-center w-60 justify-center rounded-md p-2 mt-8 gap-2 bg-white cursor-pointer">
                            <Image
                                src={IconGoogle}
                                alt="logo-trenalyze"
                                width={25}
                                height={25}
                                priority
                            />
                            Sign in with Google
                        </div>
                        <div className="border-2 flex items-center w-60 justify-center rounded-md p-2 mt-8 gap-2 bg-white cursor-pointer">
                            <Image
                                src={IconFacebook}
                                alt="logo-trenalyze"
                                width={25}
                                height={25}
                                priority
                                className="rounded-sm"
                            />
                            Sign in with Facebook
                        </div>
                    </div>
                    <div className="ms-40 me-40 flex items-center gap-4">
                        <Separator className="flex-1" />
                        <span className="text-sm text-muted-foreground">or</span>
                        <Separator className="flex-1" />
                    </div>
                    <div className="relative flex items-center border rounded-md h-12 mx-auto p-2 bg-white border-[#D9D9D9] w-130">
                        <MdEmail
                            aria-hidden
                            className="absolute left-3 h-5 w-5 text-gray-500"
                        />
                        <Input
                            type="text"
                            name="email"
                            placeholder="Email"
                            required
                            className="pl-10 outline-none placeholder-[#374151] ps-2.5 pb-[3px] text-black flex-1 border-0 shadow-none focus-visible:ring-0"
                        />
                    </div>
                    <div className="relative flex items-center border rounded-md h-12 mx-auto p-2 bg-white border-[#D9D9D9] w-130">
                        <IoMdLock
                            aria-hidden
                            className="absolute left-3 h-5 w-5 text-gray-500"
                        />
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            className="pr-10 outline-none placeholder-[#374151] ps-9.5 pb-[3px] text-black flex-1 border-0 shadow-none focus-visible:ring-0"
                        />
                        {showPassword ? (
                            <IoEyeOutline
                                className="absolute right-3 h-5 w-5 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <IoEyeOffOutline
                                className="absolute right-3 h-5 w-5 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </div>
                    <Button className="w-130 h-12 mx-auto bg-blue-500 hover:bg-blue-600 cursor-pointer">
                        Sign In
                    </Button>
                    <p className="text-sm text-[#374151] ms-40">Dont have an account? <span><Link href="/register" className="text-blue-500 hover:underline">Sign In</Link></span></p>
                </form>
            </div>
        </div>
    );
}
