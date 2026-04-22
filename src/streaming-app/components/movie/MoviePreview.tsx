import { Play, Plus, ThumbsUp, ChevronDown, Trash } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router"
import type { Genre } from "@/interfaces"
import { formatDuration } from "@/lib/utils"
import { useProfileStore } from "@/store/profile.store"
import { useAddToMyList, useRemoveFromMyList } from "@/streaming-app/hooks/useMyList"
import type { MovieDto } from "@/interfaces/dto/movie.dto"

type Props = {
    item: MovieDto,
    left: number,
    top: number,
    align: "left" | "center" | "right"
    cancelClose: () => void
    close: () => void
}


export const MoviePreview = ({ item, left, top, align, cancelClose, close }: Props) => {

    const { activeProfile } = useProfileStore()
    const { mutate: addToMyList } = useAddToMyList()
    const { mutate: removeFromMyList } = useRemoveFromMyList()

    const [isInMyList, setIsInMyList] = useState(item.isInMyList)

    useEffect(() => {
        setIsInMyList(item.isInMyList)
    }, [item.isInMyList])

    const handleAdd = () => {
        if (!activeProfile) return
        setIsInMyList(true)
        addToMyList({
            profileId: activeProfile.id.toString(),
            movieId: item.id.toString()
        }, {
            onError: () => setIsInMyList(false)
        })
    }

    const handleRemove = () => {
        if (!activeProfile) return
        setIsInMyList(false)
        removeFromMyList({
            profileId: activeProfile.id.toString(),
            movieId: item.id.toString()
        }, {
            onError: () => setIsInMyList(true)
        })
    }

    let alignClass = "origin-center -translate-x-1/2"
    if (align === "left") alignClass = "origin-left translate-x-0"
    if (align === "right") alignClass = "origin-right -translate-x-full"

    return (
        <div
            className={`absolute z-50 w-[420px] bg-[var(--background-card)] rounded-md shadow-2xl overflow-hidden -translate-y-1/2 animate-in fade-in zoom-in-95 duration-200 ${alignClass}`}
            style={{ left, top }}
            onMouseEnter={cancelClose}
            onMouseLeave={close}
        >
            {/* Preview image */}
            <div className="aspect-video relative">
                <Link to={`/movie/${item.id}`}>
                    <img
                        src={item.backdropUrl}
                        className="w-full h-full object-cover"
                    />
                </Link>
            </div>

            {/* Content */}

            <div className="p-4 space-y-3 text-white">

                {/* Buttons */}
                <div className="flex items-center gap-6">

                    <Link to={`/movie/${item.id}`}>
                        <button className="bg-white text-black rounded-full p-2 hover:scale-110 transition">
                            <Play size={30} fill="black" />
                        </button>
                    </Link>

                    {
                        !isInMyList
                            ? <button onClick={handleAdd} className="border border-gray-400 rounded-full p-2 hover:border-white">
                                <Plus size={28} />
                            </button>

                            : <button onClick={handleRemove} className="border border-gray-400 rounded-full p-2 hover:border-white">
                                <Trash size={28} />
                            </button>
                    }


                    <button className="border border-gray-400 rounded-full p-2 hover:border-white">
                        <ThumbsUp size={28} />
                    </button>

                    <div className="ml-auto">
                        <button className="border border-gray-400 rounded-full p-2 hover:border-white">
                            <ChevronDown size={28} />
                        </button>
                    </div>
                </div>

                {/* Title */}

                <h3 className="text-xl font-semibold">{item.title}</h3>

                {/* Metadata */}

                <div className="flex items-center gap-2 text-md text-gray-300 mt-6">

                    <span className="border border-gray-400 px-1 text-[16px]">
                        16+
                    </span>

                    <span>{formatDuration(item.durationMinutes)}</span>

                    <span className="border border-gray-400 px-1 text-[16px]">
                        HD
                    </span>

                    <span className="flex items-center gap-1">
                        <span>{item.releaseYear}</span>
                    </span>

                </div>

                {/* Genres */}
                <div className="text-md flex gap-2">

                    {item.genres.map((genre: Genre, index: number) => (
                        <div key={index}>
                            <span className="text-white">{genre.name}</span>
                            {index !== item.genres.length - 1 && <span className="text-gray-400"> • </span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
