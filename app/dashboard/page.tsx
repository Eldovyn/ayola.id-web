import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const DashboardPage = () => {
    return (
        <div className="flex flex-col h-screen w-full justify-center">
            <h1 className="text-3xl font-bold text-start bg-[#FAFAFA] ms-65 me-65 p-5 rounded-md border mb-10">Add A Badminton Court</h1>
            <form action="" className="ms-65 me-65 bg-[#FAFAFA] p-5 rounded-md border flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" placeholder="Name" className="bg-white" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input type="text" placeholder="Image URL" className="bg-white" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="price">Price /Jam</Label>
                    <Input type="number" placeholder="Price" className="bg-white" />
                </div>
                <Button className="w-full mx-auto bg-blue-500 hover:bg-blue-600 cursor-pointer">Add Court</Button>
            </form>
        </div>
    )
}
export default DashboardPage
