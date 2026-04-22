import { useQuery } from "@tanstack/react-query"
import {
    getHeroMovieAction,
    getMovieByIdAction,
    getMoviesAction,
    getMoviesByGenreAction,
    getSimilarMoviesAction,
    getSortMoviesAction,
    getTrendingMoviesAction
} from "../actions/movie/get-movies.action";
import { usePaginationParams } from "./usePaginationParams";

export const getMovies = () => {

    const { page, pageSize } = usePaginationParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ["movies", page, pageSize],
        queryFn: () => getMoviesAction(page, pageSize),
        retry: 1
    });

    return {
        movies: data?.data,
        page: data?.page,
        totalPages: data?.totalPages,
        totalRecords: data?.totalRecords,
        pageSize: data?.pageSize,
        hasNextPage: data?.hasNextPage,
        hasPreviousPage: data?.hasPreviousPage,
        isLoading,
        error
    };
}

export const getMoviesByGenre = (genre: string) => {
    return useQuery({
        queryKey: ["movies", genre],
        queryFn: () => getMoviesByGenreAction(genre),
        retry: 1
    });
}

export const getTrendingMovies = () => {
    return useQuery({
        queryKey: ["movies", "trending"],
        queryFn: getTrendingMoviesAction,
        retry: 1
    });
}

export const getMovieById = (id: string) => {
    return useQuery({
        queryKey: ["movies", id],
        queryFn: () => getMovieByIdAction(id),
        retry: 1
    });
}

export const getSimilarMovies = (id: string) => {
    return useQuery({
        queryKey: ["movies", "similar", id],
        queryFn: () => getSimilarMoviesAction(id),
        retry: 1
    });
}

export const getHeroMovie = (genre?: string) => {
    return useQuery({
        queryKey: ["movies", "hero", genre],
        queryFn: () => getHeroMovieAction(genre),
        retry: 1
    });
}


export const getSortMovies = (sortBy: string, limit: number = 15) => {
    return useQuery({
        queryKey: ["movies", "sort", sortBy, limit],
        queryFn: () => getSortMoviesAction(sortBy, limit),
        retry: 1
    });
}