import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { ApiGetCourtsResponse } from "@/type";

export const useGetCourt = (token: string, currentPage: string | null | undefined) => {
    return useQuery({
        queryKey: ["get-court", token, currentPage],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiGetCourtsResponse>(`/court`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    current_page: currentPage,
                },
            });
            return response.data;
        },
        enabled: !!token,
        refetchOnWindowFocus: false,
        retry: false,
    });
};