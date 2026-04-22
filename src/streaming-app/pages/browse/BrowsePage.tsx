import { MovieGrid } from "@/streaming-app/components/movie/MovieGrid";
import { Loading, NotFound, Hero, Error, PaginationComponent } from "@/streaming-app/components/shared";
import { getHeroMovie, getMovies } from "@/streaming-app/hooks/useMovies";
import { usePaginationParams } from "@/streaming-app/hooks/usePaginationParams";


export const BrowsePage = () => {

    const { page, pageSize, setParams } = usePaginationParams();
    const { movies, isLoading, error, totalPages, hasNextPage, hasPreviousPage } = getMovies();
    const { data: heroMovie } = getHeroMovie();

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error title="Error fetching movies" />
    }

    if (movies?.length === 0 || !movies) {
        return <NotFound title="No movies found" />
    }

    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];

    return (
        <div>
            <Hero movie={heroMovie || randomMovie} />
            <MovieGrid movies={movies} />
            <PaginationComponent
                page={page!}
                totalPages={totalPages!}
                hasNextPage={hasNextPage!}
                hasPreviousPage={hasPreviousPage!}
                onPageChange={(newPage) => setParams(newPage, pageSize)}
            />
        </div>
    )
}

