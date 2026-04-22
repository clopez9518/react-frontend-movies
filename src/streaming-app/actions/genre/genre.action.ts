import { streamingApi } from "@/api/streaming.api";
import type { Genre } from "@/interfaces";

export const getGenresAction = async () => {
    try {
        const { data } = await streamingApi.get<Genre[]>("/genres");
        return data;
    } catch (error) {
        throw error;
    }
}
