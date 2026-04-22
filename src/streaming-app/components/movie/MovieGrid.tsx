import type { MovieDto } from "@/interfaces/dto/movie.dto";
import { MovieItem } from "./MovieItem";

interface MovieGridProps {
    movies: MovieDto[];
}


export const MovieGrid = ({ movies }: MovieGridProps) => {
    return (
        <div className="px-6 lg:px-12 py-4">
            <div className="mb-6">
                <p className="text-gray-400 text-sm">
                    {movies.length} {movies.length === 1 ? 'title' : 'titles'}
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {movies.map((movie) => (
                    <MovieItem key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}
