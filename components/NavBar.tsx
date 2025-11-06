import Link from "next/link";
import { Button } from "@/components/ui/button"
import { useUserMe } from "@/services/user/user-me";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const NavBar = () => {
    const accessToken = Cookies.get("accessToken");

    const { data: dataUserMe, isSuccess: isSuccessUserMe } = useUserMe(accessToken || "");

    console.log(dataUserMe);

    return (
        <>
            <nav className="navbar bg-white shadow-sm fixed top-0 left-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/history-booking">History Booking</Link></li>
                            <li><Link href="/favorite-booking">Favorite Booking</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">ayola.id</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/history-booking">History Booking</Link></li>
                        <li><Link href="/favorite-booking">Favorite Booking</Link></li>
                    </ul>
                </div>
                {!isSuccessUserMe ? (
                    <div className="navbar-end">
                        <Button variant="outline" className="bg-blue-500 text-white hover:bg-blue-500 hover:text-white cursor-pointer">Sign In</Button>
                    </div>
                ) : (
                    <div className="navbar-end">
                        <Avatar>
                            <AvatarImage src={dataUserMe?.data?.avatar} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                )}
            </nav>
        </>
    )
};

export default NavBar;