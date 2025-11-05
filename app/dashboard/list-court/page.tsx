import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Place } from "@/type";

const PageListCourt = () => {
    const places: Place[] = [
        {
            id: "bv-01",
            name: "SmashPoint Arena",
            image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
            description: "Hall 3 lapangan vinyl dengan pencahayaan LED & ruang tunggu ber-AC. Cocok untuk latihan rutin.",
            pricePerHour: 120000
        },
        {
            id: "bv-02",
            name: "Night Court Prime",
            image: "https://images.unsplash.com/photo-1599391398131-cd12dfc6c24e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=711",
            description: "Outdoor lighting premium untuk main malam, tersedia rental raket & shuttle.",
            pricePerHour: 90000
        },
        {
            id: "bv-03",
            name: "Feather Hub",
            image: "https://images.unsplash.com/photo-1595220427358-8cf2ce3d7f89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1476",
            description: "Studio privat 1 lapangan—sepi, nyaman, ideal untuk coaching 1-on-1.",
            pricePerHour: 150000
        },
        {
            id: "bv-04",
            name: "Parkside Badminton",
            image: "https://plus.unsplash.com/premium_photo-1664303134673-7a073bf3fb54?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=736",
            description: "Lapangan park outdoor rindang—cocok untuk komunitas & fun games.",
            pricePerHour: 75000
        },
        {
            id: "bv-05",
            name: "Urban Lines Hall",
            image: "https://plus.unsplash.com/premium_photo-1708119178805-321dec8ba9cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1633",
            description: "Arena kota bergaris tegas, akses mudah dekat stasiun & parkir luas.",
            pricePerHour: 110000
        },
        {
            id: "bv-06",
            name: "Shuttle Classic",
            image: "https://images.unsplash.com/photo-1664106588879-5480437fb30f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
            description: "Gudang peralatan lengkap—tersedia paket bundle raket + lapangan.",
            pricePerHour: 100000
        },
        {
            id: "bv-07",
            name: "Nordic Drive Court",
            image: "https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
            description: "Lapangan standar turnamen—garis akurat, net premium, pro-shop on-site.",
            pricePerHour: 180000
        },
        {
            id: "bv-08",
            name: "Monochrome Court",
            image: "https://plus.unsplash.com/premium_photo-1745951329360-4c25a8f19c9d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1633",
            description: "Aesthetic industrial—spot foto kece + lounge kopi setelah sparring.",
            pricePerHour: 95000
        }
    ];

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
                    {places.map((place) => (
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
            </div>
        </>
    )
}

export default PageListCourt