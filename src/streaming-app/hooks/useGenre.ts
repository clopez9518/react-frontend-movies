import { useQuery } from "@tanstack/react-query"
import { getGenresAction } from "../actions/genre/genre.action"

export const getGenres = () => {
    return useQuery({
        queryKey: ['genres'],
        queryFn: getGenresAction,
    })
}