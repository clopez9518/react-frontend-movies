import { useSearchParams } from "react-router";

export const usePaginationParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const setParams = (newPage: number, newPageSize: number) => {
        searchParams.set("page", newPage.toString());
        searchParams.set("pageSize", newPageSize.toString());
        setSearchParams(searchParams);
    };

    return {
        page,
        pageSize,
        setParams,
    };
};