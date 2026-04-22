import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router"
import type { Movie } from "@/interfaces"
import { MoviePreview } from "../movie/MoviePreview"
import type { MovieDto } from "@/interfaces/dto/movie.dto"

type Props = {
    title: string
    items: MovieDto[]
}

export const ContentRow = ({ title, items }: Props) => {

    const containerRef = useRef<HTMLDivElement>(null)
    const rowRef = useRef<HTMLDivElement>(null)

    const openTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [preview, setPreview] = useState<{
        item: MovieDto
        left: number
        top: number
        align: "left" | "center" | "right"
    } | null>(null)

    const scroll = (dir: "left" | "right") => {
        if (!rowRef.current) return

        const container = rowRef.current
        const width = container.clientWidth

        const maxScrollLeft = container.scrollWidth - container.clientWidth

        if (dir === "right") {
            // Si ya estás al final → vuelve al inicio
            if (container.scrollLeft >= maxScrollLeft - 10) {
                container.scrollTo({
                    left: 0,
                    behavior: "smooth"
                })
            } else {
                container.scrollBy({
                    left: width,
                    behavior: "smooth"
                })
            }
        } else {
            // Flecha izquierda (opcional: ir al final si estás al inicio)
            if (container.scrollLeft <= 0) {
                container.scrollTo({
                    left: maxScrollLeft,
                    behavior: "smooth"
                })
            } else {
                container.scrollBy({
                    left: -width,
                    behavior: "smooth"
                })
            }
        }
    }

    const handleMouseEnter = (
        item: Movie,
        e: React.MouseEvent<HTMLDivElement>
    ) => {

        if (!containerRef.current) return

        const cardRect = e.currentTarget.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()

        const relativeLeft = cardRect.left - containerRect.left
        const relativeRight = containerRect.right - cardRect.right

        let left = relativeLeft + cardRect.width / 2
        let top = (cardRect.top - containerRect.top) + cardRect.height / 2
        let align: "left" | "center" | "right" = "center"

        if (relativeLeft < 100) {
            left = relativeLeft
            align = "left"
        } else if (relativeRight < 100) {
            left = relativeLeft + cardRect.width
            align = "right"
        }

        openTimeout.current = setTimeout(() => {
            setPreview({
                item,
                left,
                top,
                align
            })
        }, 700)

    }

    const handleMouseLeave = () => {
        if (openTimeout.current) clearTimeout(openTimeout.current)
        closeTimeout.current = setTimeout(() => {
            setPreview(null)
        }, 300)
    }

    return (
        <div ref={containerRef} className="relative px-12 mb-10 group">

            <h2 className="text-[var(--text-primary)] text-xl font-semibold mb-3">
                {title}
            </h2>

            <button
                onClick={() => scroll("left")}
                className="cursor-pointer absolute left-0 top-3/5 -translate-y-1/2 z-20
                            opacity-0 group-hover:opacity-100
                            h-full w-12 flex items-center justify-center">
                <ChevronLeft className="text-white" />
            </button>

            <div
                ref={rowRef}
                className="flex gap-2 overflow-x-auto overflow-y-visible scroll-smooth scrollbar-hide">

                {items.map((item) => (
                    <Link key={item.id} to={`/movie/${item.id}`}>
                        <div
                            className="relative flex-shrink-0 w-[260px] cursor-pointer"
                            onMouseEnter={(e) => handleMouseEnter(item, e)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                className="w-full h-[150px] object-cover rounded-md"
                            />
                        </div>
                    </Link>
                ))}

            </div>

            <button
                onClick={() => scroll("right")}
                className="cursor-pointer absolute right-0 top-3/5 -translate-y-1/2 z-20
                            opacity-0 group-hover:opacity-100
                            h-full w-12 flex items-center justify-center"
            >
                <ChevronRight className="text-white" />
            </button>

            {preview && (
                <MoviePreview
                    item={items.find(i => i.id === preview.item.id) || preview.item}
                    left={preview.left}
                    top={preview.top}
                    align={preview.align}
                    cancelClose={() => {
                        if (closeTimeout.current) clearTimeout(closeTimeout.current)
                    }}
                    close={() => setPreview(null)}
                />
            )}

        </div>
    )
}