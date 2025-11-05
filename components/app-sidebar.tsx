import { IoMdAddCircle } from "react-icons/io";
import { RiFileListFill } from "react-icons/ri";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FaBagShopping } from "react-icons/fa6";

const items = [
    {
        title: "Add Court",
        url: "/dashboard",
        icon: IoMdAddCircle,
    },
    {
        title: "List Court",
        url: "/dashboard/list-court",
        icon: RiFileListFill,
    },
    {
        title: "Booking List",
        url: "/dashboard/booking-list",
        icon: FaBagShopping,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-2xl font-bold h-15">Ayola.id</SidebarGroupLabel>
                    <hr />
                    <br />
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="text-xl mt-1 mb-1 flex flex-row gap-7">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}