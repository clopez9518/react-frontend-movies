import { useParams } from "react-router"
import { getHeroMovie, getMoviesByGenre } from "../../hooks/useMovies"
import { Error, Loading, NotFound } from "../../components/shared"
import { Hero } from "../../components/shared/Hero"
import { MovieGrid } from "../../components/movie/MovieGrid"


export const GenrePage = () => {
    const { genre } = useParams()
    const { data, isLoading, error } = getMoviesByGenre(genre!)
    const { data: heroMovie } = getHeroMovie(genre!);


    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return (
            <Error title="Error fetching movies" />
        )
    }

    if (data?.length === 0 || !data) {
        return (
            <NotFound title="No movies found" />
        )
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    const randomMovie = data[randomIndex];

    return (
        <div>
            <Hero movie={heroMovie || randomMovie} />
            <MovieGrid movies={data} />
        </div>
    )
}
