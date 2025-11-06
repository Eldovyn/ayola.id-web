'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AddCourtInput, ApiResponse, ErrorResponse } from "@/type";
import { AxiosError } from "axios";
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import { toast } from "sonner";

const DashboardPage = () => {
    const accessToken = Cookies.get('accessToken') || "";

    const { mutate } = useMutation({
        mutationFn: async (data: AddCourtInput) => {
            const response = await axiosInstance.post("/court", data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            return response;
        },
        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
            console.log(err.response?.data);
        },
        onSuccess: async (data) => {
            const res = data.data as ApiResponse;
            toast.success(res.message);
        },
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            image_url: "",
            price: 0,
            description: "",
        },
        onSubmit: (values, { setSubmitting }) => {
            try {
                const { name, image_url, price, description } = values;
                mutate({
                    name,
                    image_url,
                    price,
                    description
                } as AddCourtInput);
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="flex flex-col h-screen w-full justify-center">
            <h1 className="text-3xl font-bold text-start bg-[#FAFAFA] ms-65 me-65 p-5 rounded-md border mb-10">Add A Badminton Court</h1>
            <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit} className="ms-65 me-65 bg-[#FAFAFA] p-5 rounded-md border flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" placeholder="Name" className="bg-white" onChange={formik.handleChange} value={formik.values.name} name="name" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input type="text" placeholder="Image URL" className="bg-white" onChange={formik.handleChange} value={formik.values.image_url} name="image_url" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="price">Price /Jam</Label>
                    <Input type="number" placeholder="Price" className="bg-white" onChange={formik.handleChange} value={formik.values.price} name="price" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea className="bg-white" placeholder="Description" onChange={formik.handleChange} value={formik.values.description} name="description" />
                </div>
                <Button className="w-full mx-auto bg-blue-500 hover:bg-blue-600 cursor-pointer" type="submit">
                    {formik.isSubmitting ? <Spinner className="mr-1" /> : null}
                    Sign In
                </Button>
            </form>
        </div>
    )
}
export default DashboardPage
