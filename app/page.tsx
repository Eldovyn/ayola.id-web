import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";

export default function Home() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/history-booking">History Booking</Link></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">ayola.id</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/history-booking">History Booking</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          <Button variant="outline" className="bg-blue-500 text-white hover:bg-blue-500 hover:text-white cursor-pointer">Sign In</Button>
        </div>
      </div>
      <div className="flex h-screen w-full">
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
      </div>
    </>
  );
}
