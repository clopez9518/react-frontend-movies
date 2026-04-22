import type { MovieDto } from '@/interfaces/dto/movie.dto'
import { useProfileStore } from '@/store/profile.store'
import { useAddToMyList, useRemoveFromMyList } from '@/streaming-app/hooks/useMyList'
import { Play, Plus, Trash } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router'

interface Props {
    movie: MovieDto
}

export const MovieItem = ({ movie }: Props) => {

    const { activeProfile } = useProfileStore()
    const { mutate: addToMyList } = useAddToMyList()
    const { mutate: removeFromMyList } = useRemoveFromMyList()

    const handleAddMovie = (movie: MovieDto) => {
        if (!activeProfile) return
        addToMyList({
            profileId: activeProfile.id.toString(),
            movieId: movie.id.toString()
        })
    }

    const handleRemoveMovie = (movie: MovieDto) => {
        if (!activeProfile) return
        removeFromMyList({
            profileId: activeProfile.id.toString(),
            movieId: movie.id.toString()
        })
    }

    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <motion.div
            key={movie.id}
            className="relative cursor-pointer group"
            onMouseEnter={() => setHoveredId(movie.id)}
            onMouseLeave={() => setHoveredId(null)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >

            <div className="relative aspect-video rounded overflow-hidden bg-gray-800">
                <img
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                {/* Hover Overlay */}
                {hoveredId === movie.id && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4"
                    >
                        <h3 className="text-white text-sm mb-2" style={{ fontWeight: 600 }}>
                            {movie.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                            <Link to={`/movie/${movie.id}`}>
                                <button
                                    className="cursor-pointer w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors"
                                >
                                    <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                                </button>
                            </Link>

                            {
                                !movie.isInMyList
                                    ? (<button
                                        onClick={() => handleAddMovie(movie)}
                                        className="cursor-pointer w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors"
                                    >
                                        <Plus className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                    </button>)

                                    : (<button
                                        onClick={() => handleRemoveMovie(movie)}
                                        className="cursor-pointer w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors"
                                    >
                                        <Trash className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                    </button>)
                            }


                        </div>
                        <div className="flex flex-wrap gap-1">
                            {movie.genres.slice(0, 2).map((g, idx) => (
                                <span key={idx} className="text-xs text-gray-300">
                                    {g.name}
                                    {idx < Math.min(movie.genres.length, 2) - 1 && ' •'}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

        </motion.div>
    )
}
