
import { patchMovieAdmin } from "@/admin/hooks/useAdminMovies"
import { Button } from "@/components/ui/button"
import type { MovieAdmin } from "@/interfaces"



export const MovieActionsCell = ({ movie }: { movie: MovieAdmin }) => {
    const movieMutation = patchMovieAdmin()

    return (
        <div className="flex gap-2">
            <Button
                className="cursor-pointer bg-red-500 hover:bg-red-600"
                onClick={() => movieMutation.mutate({ id: movie.id.toString(), movie: { isActive: !movie.isActive } })}
                disabled={movieMutation.isPending}
            >
                {movie.isActive
                    ? "Deactivate"
                    : "Activate"}
            </Button>
        </div>
    )
}