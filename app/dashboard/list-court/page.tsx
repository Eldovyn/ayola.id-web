'use client'
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useGetCourt } from "@/services/court/get-court";
import Cookies from "js-cookie";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from 'next/navigation';
import { Court } from "@/type";

const PageListCourt = () => {
    const accessToken = Cookies.get("accessToken") || "";

    const searchParams = useSearchParams();

    const currentPage = searchParams.get('currentPage') || "1";

    const { data } = useGetCourt(accessToken, currentPage);

    return (
        <>
            <div className="flex flex-col h-screen w-full justify-center">
                <div className="flex justify-between bg-[#FAFAFA] p-5 rounded-md border ms-65 me-65">
                    <h1 className="text-3xl font-bold">List Badminton Court</h1>
                    <div className="relative w-72">
                        <Input type="search" placeholder="Search" className="pr-10 bg-white" />
                        <IoSearchOutline
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                            size={18}
                            aria-hidden
                        />
                    </div>
                </div>
                <br />
                <div className="flex flex-col border ms-65 me-65 rounded-md">
                    {data?.data.map((place: Court) => (
                        <div
                            key={place.id}
                            className="flex flex-row bg-[#FAFAFA] p-5 justify-between items-center"
                        >
                            <h2 className="text-xl font-semibold">{place.name}</h2>
                            <div className="flex flex-row gap-5">
                                <div className="bg-blue-500 flex items-center p-3 rounded-md cursor-pointer">
                                    <MdEdit className="text-white" />
                                </div>
                                <div className="bg-red-500 flex items-center p-3 rounded-md cursor-pointer">
                                    <FaTrash className="text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <br />
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    )
}

export default PageListCourt