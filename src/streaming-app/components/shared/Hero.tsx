import { Play, Plus, Trash } from "lucide-react"
import { formatDuration } from "../../../lib/utils"
import { Link } from "react-router"
import type { MovieDto } from "@/interfaces/dto/movie.dto"
import { useProfileStore } from "@/store/profile.store"
import { useAddToMyList, useRemoveFromMyList } from "@/streaming-app/hooks/useMyList"


interface Props {
    movie: MovieDto
}

export const Hero = ({ movie }: Props) => {

    const { activeProfile } = useProfileStore()
    const { mutate: addToMyList } = useAddToMyList()
    const { mutate: removeFromMyList } = useRemoveFromMyList()

    const handleAddMovie = () => {
        if (!activeProfile) return
        addToMyList({
            profileId: activeProfile.id.toString(),
            movieId: movie.id.toString()
        })
    }

    const handleRemoveMovie = () => {
        if (!activeProfile) return
        removeFromMyList({
            profileId: activeProfile.id.toString(),
            movieId: movie.id.toString()
        })
    }


    return (
        <div className="dark relative h-[90vh] w-full overflow-hidden">
            {/* <div className="absolute inset-0">
                <img
                    src={movie.heroUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover object-[50%_20%]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/90 via-transparent to-transparent" />
            </div> */}
            <div
                className="absolute inset-0 bg-cover bg-[50%_10%]"
                style={{ backgroundImage: `url(${movie.backdropUrl})` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/90 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative h-full flex items-center px-6 lg:px-12 max-w-7xl">
                <div className="max-w-2xl space-y-6">
                    <h1 className="text-5xl md:text-7xl text-white tracking-tight" style={{ fontWeight: 700, lineHeight: 1.1 }}>
                        {movie.title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">
                        {movie.description}
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                        <Link to={`/movie/${movie.id}`}>
                            <button className="cursor-pointer flex items-center gap-2 bg-white hover:bg-white/90 text-black px-8 py-3 rounded transition-all duration-200 shadow-lg hover:shadow-xl" style={{ fontWeight: 600 }}>
                                <Play className="w-5 h-5 fill-black" />
                                Play
                            </button>
                        </Link>
                        {
                            !movie.isInMyList
                                ? (<button onClick={handleAddMovie} className="border text-white border-gray-400 rounded-full p-2 hover:border-white">
                                    <Plus size={28} />
                                </button>)
                                : (<button onClick={handleRemoveMovie} className="border text-white border-gray-400 rounded-full p-2 hover:border-white">
                                    <Trash size={28} />
                                </button>)
                        }

                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 border-2 border-gray-400 text-gray-400 text-xs" style={{ fontWeight: 600 }}>
                                16+
                            </span>
                            <span className="text-gray-400 text-sm">2026</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <span>{formatDuration(movie.durationMinutes)}</span>
                            <span>•</span>
                            {movie.genres.map((genre, index) => (
                                <div key={index}>
                                    <span>{genre.name}</span>
                                    {index !== movie.genres?.length - 1 && <span className="ml-2">•</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
