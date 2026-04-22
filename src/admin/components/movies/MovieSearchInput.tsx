import { useEffect, useState } from "react";
import type { TmdbMovieDto } from "@/interfaces/dto/tmdb.dto";
import { getTmdbMovies } from "@/admin/hooks/useAdminMovies";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList,
    CommandItem
} from "@/components/ui/command";


export const MovieSearchInput = ({ onSelect, }: { onSelect: (movie: TmdbMovieDto) => void }) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [, setIsOpen] = useState(false);

    // ⏱️ Debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 400);

        return () => clearTimeout(timeout);
    }, [query]);

    const { data = [], isLoading } = getTmdbMovies(debouncedQuery);

    const handleSelect = (movie: TmdbMovieDto) => {
        setIsOpen(false);
        onSelect(movie);
        setQuery("");
    };

    return (
        <div className="w-full mb-5">
            <Command className="rounded-lg border shadow-md">
                {/* Input */}
                <CommandInput
                    placeholder="Search movie in TMDB..."
                    value={query}
                    onValueChange={setQuery}
                />

                {/* Lista */}
                <CommandList>
                    {/* Loading */}
                    {isLoading && (
                        <div className="p-3 text-sm text-muted-foreground">
                            Buscando...
                        </div>
                    )}

                    {/* Sin resultados */}
                    {!isLoading && data.length === 0 && debouncedQuery && (
                        <CommandEmpty>No se encontraron películas</CommandEmpty>
                    )}

                    {/* Resultados */}
                    <CommandGroup>
                        {data.map((movie) => (
                            <CommandItem
                                key={movie.id}
                                value={movie.title + movie.id}
                                onSelect={() => handleSelect(movie)}
                                className="flex items-center gap-3 px-3 py-2 min-h-[60px] cursor-pointer"
                            >
                                {/* Poster */}
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-10 min-h-14 object-cover rounded"
                                    />
                                )}

                                {/* Info */}
                                <div className="flex flex-col">
                                    <span className="font-medium">{movie.title}</span>
                                    {movie.release_date && (
                                        <span className="text-xs text-muted-foreground">
                                            {movie.release_date}
                                        </span>
                                    )}
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    );
};