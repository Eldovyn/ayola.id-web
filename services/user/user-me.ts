import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/type";

export const useUserMe = (token: string) => {
    return useQuery({
        queryKey: ["page-email-verification", token],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse>(`/users/@me`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        enabled: !!token,
        refetchOnWindowFocus: false,
        retry: false,
    });
};