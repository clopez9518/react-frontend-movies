
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { getGenres } from "@/streaming-app/hooks/useGenre";


export const GenreDropdown = () => {

    const { data: genres } = getGenres();

    if (!genres) {
        return null;
    }

    return (
        <DropdownMenu dir="ltr">
            <DropdownMenuTrigger asChild >
                <Button className="cursor-pointer text-white text-md bg-transparent dark hover:bg-[var(--primary)]">Genres: </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[500px] p-4 bg-[var(--background)] dark" align="start">
                <div className="grid grid-cols-3 gap-2">
                    {genres.map((genre) => (
                        <Link key={genre.id} to={`/browse/${genre.name.toLowerCase()}`}>
                            <DropdownMenuItem className="cursor-pointer text-white hover:bg-[var(--background-card)] dark">{genre.name}</DropdownMenuItem>
                        </Link>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}