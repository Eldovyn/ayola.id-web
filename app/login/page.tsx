import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const PageLogin = () => {
    return (
        <>
            <div className="h-screen flex justify-center items-center bg-[#EEF2F5]">
                <div className="bg-[#FFFFFF] w-150 h-150 rounded-lg flex flex-col gap-2 justify-center">
                    <h1 className="text-3xl font-bold text-center">Welcome Back To Chaty</h1>
                    <p className="ps-20 pe-20 text-gray-500 text-sm text-center -mt-2">Sign in to your account</p>
                    <form action="" className="pt-15 flex gap-5 flex-col">
                        <div className="flex flex-col gap-2 ms-20 me-20 ">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" placeholder="Email" />
                        </div>
                        <div className="flex flex-col gap-2 ms-20 me-20 ">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" placeholder="Password" />
                        </div>
                        <Button className="w-110 mx-auto bg-blue-500 hover:bg-blue-600 cursor-pointer">Login</Button>
                        <p className="text-sm text-end me-20 -mt-3">dont have an account? <span><Link href="/register" className="text-blue-500 underline">register</Link></span></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PageLogin