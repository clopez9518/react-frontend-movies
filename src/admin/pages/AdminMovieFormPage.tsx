import { useParams } from "react-router"
import { EditMovieForm } from "../components/movies/EditMovieForm"
import { getMovieByIdAdmin } from "../hooks/useAdminMovies"
import { Loading, Error } from "@/streaming-app/components/shared"
import { getGenres } from "@/streaming-app/hooks/useGenre"
import type { MovieAdmin } from "@/interfaces"
import type { CreateMovieDto } from "@/interfaces/dto/movie.dto"
import { CreateMovieForm } from "../components/movies/CreateMovieForm"

export const AdminMovieFormPage = () => {

    const { id } = useParams()
    const { data: genres } = getGenres()

    // const [movie, setMovie] = useState<MovieAdmin | CreateMovieDto | undefined>(undefined)
    let movie: MovieAdmin | CreateMovieDto | undefined = undefined

    const isEdit = !!id

    if (isEdit) {
        const { data, isLoading, error } = getMovieByIdAdmin(id!)
        if (isLoading) {
            return <Loading />
        }
        if (error) {
            return <Error title="Error al cargar la película" />
        }
        movie = data
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">{isEdit ? "Editar Película" : "Crear Película"}</h1>
            {isEdit ? (
                <EditMovieForm movie={movie as MovieAdmin} genres={genres || []} />
            ) : (
                <CreateMovieForm movie={movie as CreateMovieDto} genres={genres || []} />
            )}
        </div>
    )
}
