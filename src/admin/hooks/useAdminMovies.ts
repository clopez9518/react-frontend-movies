import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getAdminMovieByIdAction,
    getAdminMoviesAction,
    patchAdminMovieAction,
    postAdminMovieAction,
    putAdminMovieGenresAction
} from "../actions/movie/adminMovie.action";
import type { CreateMovieDto, UpdateMovieDto } from "@/interfaces/dto/movie.dto";
import { getTmdbMovieByIdAction, getTmdbMoviesAction } from "../actions/tmdb/tmdb.action";
import { notify } from "@/lib/notify";


export const getMoviesAdmin = () => {
    return useQuery({
        queryKey: ["admin-movies"],
        queryFn: getAdminMoviesAction,
        retry: 1
    });
}

export const getMovieByIdAdmin = (id: string) => {
    return useQuery({
        queryKey: ["admin-movie", id],
        queryFn: () => getAdminMovieByIdAction(id),
        retry: 1
    });
}

export const patchMovieAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, movie }: { id: string; movie: UpdateMovieDto }) =>
            patchAdminMovieAction(id, movie),

        retry: 1,

        onSuccess: (updatedMovie) => {
            notify.success("Movie updated successfully");
            queryClient.invalidateQueries({ queryKey: ["admin-movies"] });
            queryClient.invalidateQueries({ queryKey: ["movies"] });
            queryClient.setQueryData(["admin-movie", updatedMovie.id.toString()], updatedMovie);
        },
        onError: () => {
            notify.error('Error updating movie');
        }
    });
};

export const putMovieGenresAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, genreIds }: { id: string; genreIds: number[] }) =>
            putAdminMovieGenresAction(id, genreIds),
        retry: 1,

        onSuccess: (updatedMovie) => {
            queryClient.invalidateQueries({ queryKey: ["admin-movies"] });
            queryClient.invalidateQueries({ queryKey: ["movies"] });
            queryClient.setQueryData(["admin-movie", updatedMovie.id.toString()], updatedMovie);
        },
    });
};

export const postMovieAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (movie: CreateMovieDto) =>
            postAdminMovieAction(movie),
        retry: 1,

        onSuccess: (createdMovie) => {
            notify.success("Movie created successfully");
            queryClient.invalidateQueries({ queryKey: ["admin-movies"] });
            queryClient.invalidateQueries({ queryKey: ["movies"] });
            queryClient.setQueryData(["admin-movie", createdMovie.id.toString()], createdMovie);
        },
        onError: () => {
            notify.error('Error creating movie');
        }
    });
};

export const getTmdbMovies = (query: string) => {
    return useQuery({
        queryKey: ["tmdb-movies", query],
        queryFn: () => getTmdbMoviesAction(query),
        enabled: !!query.trim() && query.length > 2,
        retry: 1
    });
}

export const getTmdbMovieById = (id: number) => {
    return useQuery({
        queryKey: ["tmdb-movie", id],
        queryFn: () => getTmdbMovieByIdAction(id),
        enabled: !!id,
        retry: 1
    });
}

