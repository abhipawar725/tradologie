import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../api/category.api";

export const useCategoryies = (page, limit) => {
    return useQuery({
        queryKey: ["categories", page, limit],
        queryFn: getCategory,
        keepPreviousData: true
    })
}