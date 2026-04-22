import { Plus, Save, X } from "lucide-react"
import { useNavigate } from "react-router"
import type { MovieAdmin } from "@/interfaces/entities/movie.interface"
import { useForm } from "react-hook-form"
import type { Genre } from "@/interfaces"
import { useState } from "react"
import type { CreateMovieDto } from "@/interfaces/dto/movie.dto"
import { MovieSearchInput } from "./MovieSearchInput"
import type { TmdbMovieDto } from "@/interfaces/dto/tmdb.dto"
import { useQueryClient } from "@tanstack/react-query";
import { getTmdbMovieByIdAction } from "@/admin/actions/tmdb/tmdb.action"
import { postMovieAdmin, putMovieGenresAdmin } from "@/admin/hooks/useAdminMovies"

interface MovieFormProps {
    movie?: CreateMovieDto,
    genres: Genre[]
}

interface FormData extends MovieAdmin {
    newCastMember: string;
    newCrewMember: string;
}

export const CreateMovieForm = ({ movie, genres }: MovieFormProps) => {

    const navigate = useNavigate()
    const [isPosting, setIsPosting] = useState(false)
    const queryClient = useQueryClient();
    const postMovieMutation = postMovieAdmin();
    const putMovieGenresMutation = putMovieGenresAdmin();


    const { register, handleSubmit, formState: { errors, dirtyFields }, watch, setValue, getValues } = useForm<FormData>({
        defaultValues: {
            title: movie?.title || '',
            description: movie?.description || '',
            durationMinutes: movie?.durationMinutes || 0,
            thumbnailUrl: movie?.thumbnailUrl || '',
            backdropUrl: movie?.backdropUrl || '',
            videoUrl: movie?.videoUrl || 'https://www.example.com/video.mp4',
            releaseYear: movie?.releaseYear || 0,
            rating: movie?.rating || 0,
            genres: movie?.genres || [],
            isTrending: movie?.isTrending || false,
            cast: movie?.cast || [],
            crew: movie?.crew || []
        }
    })

    const selectedGenres = watch("genres");
    const cast = watch("cast");
    const crew = watch("crew");

    const handleAddItem = (field: "cast" | "crew", inputField: "newCastMember" | "newCrewMember") => {
        const newValue = getValues(inputField)?.trim();
        if (!newValue) return;
        const current = getValues(field) || [];
        setValue(field, [...current, newValue], { shouldDirty: true });
        setValue(inputField, "");
    };

    const handleRemoveItem = (field: "cast" | "crew", index: number) => {
        const current = getValues(field) || [];
        const updated = current.filter((_: string, i: number) => i !== index);
        setValue(field, updated, { shouldDirty: true });
    };

    const onSubmit = async (data: FormData) => {
        setIsPosting(true)

        const updatedFields: Partial<FormData> = {};
        Object.keys(dirtyFields).forEach(key => {
            updatedFields[key as keyof FormData] = data[key as keyof FormData] as any;
        });

        if (Object.keys(updatedFields).length === 0) {
            setIsPosting(false)
            return;
        }

        const movieDto: CreateMovieDto = {
            title: data.title,
            description: data.description,
            durationMinutes: data.durationMinutes,
            thumbnailUrl: data.thumbnailUrl,
            backdropUrl: data.backdropUrl,
            videoUrl: data.videoUrl,
            releaseYear: data.releaseYear,
            rating: data.rating,
            genres: data.genres,
            isTrending: data.isTrending,
            cast: data.cast,
            crew: data.crew
        }

        const createdMovie = await postMovieMutation.mutateAsync(movieDto);
        if (createdMovie) {
            const genreIds = data.genres.map(genre => genre.id);
            await putMovieGenresMutation.mutateAsync({ id: createdMovie.id.toString(), genreIds });
            setIsPosting(false)
            navigate(`/admin/dashboard`);
        }

        setIsPosting(false)
    }

    const onSelectMovie = async (movie: TmdbMovieDto) => {

        const movieDetails = await queryClient.fetchQuery({
            queryKey: ["tmdb-movie", movie.id],
            queryFn: () => getTmdbMovieByIdAction(movie.id),
            retry: 1
        });

        if (!movieDetails) return;

        setValue("title", movieDetails.title, { shouldDirty: true });
        setValue("description", movieDetails.overview, { shouldDirty: true });
        setValue("durationMinutes", movieDetails.runtime, { shouldDirty: true });
        setValue("thumbnailUrl", `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`, { shouldDirty: true });
        setValue("backdropUrl", `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`, { shouldDirty: true });
        setValue("releaseYear", new Date(movieDetails.release_date).getFullYear(), { shouldDirty: true });
        setValue("rating", movieDetails.vote_average, { shouldDirty: true });
        setValue("genres", genres.filter(genre => movieDetails.genres.some(g => g.id === genre.idTmdb)), { shouldDirty: true });
        setValue("isTrending", movieDetails.popularity >= 80, { shouldDirty: true });
        setValue("cast", movieDetails.credits.cast.map(cast => cast.name), { shouldDirty: true });
        setValue("crew", movieDetails.credits.crew.map(crew => crew.name), { shouldDirty: true });
    }

    return (
        <div>
            <MovieSearchInput onSelect={onSelectMovie} />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Title *</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                            placeholder="Enter movie title"
                            {...register('title', {
                                required: 'Title is required'
                            })}
                        />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Description *</label>
                        <textarea
                            required
                            {...register('description', {
                                required: 'Description is required'
                            })}
                            rows={4}
                            className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                            placeholder="Enter movie description"
                        />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>

                    {/* Release Date and Rating */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Release Date *</label>
                            <input
                                type="number"
                                required
                                {...register('releaseYear', {
                                    required: 'Release year is required',
                                    min: 1888,
                                    max: {
                                        value: new Date().getFullYear(),
                                        message: 'Release year must be less than or equal to the current year'
                                    },
                                    valueAsNumber: true,
                                })}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                            />
                            {errors.releaseYear && <p className="text-red-500">{errors.releaseYear.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Rating (0-10) *</label>
                            <input
                                type="number"
                                required
                                min="0"
                                max="10"
                                step="0.0001"
                                {...register('rating', {
                                    required: 'Rating is required',
                                    min: 0,
                                    max: 10,
                                    validate: (value) =>
                                        /^\d+(\.\d{1,4})?$/.test(value.toString()) || 'Máximo 4 decimales',
                                    valueAsNumber: true,
                                })}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="8.5"
                            />
                            {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Duration (minutes) *</label>
                            <input
                                type="number"
                                required
                                min="0"
                                {...register('durationMinutes', {
                                    required: 'Duration is required',
                                    min: 0,
                                    valueAsNumber: true,
                                })}
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="120"
                            />
                            {errors.durationMinutes && <p className="text-red-500">{errors.durationMinutes.message}</p>}
                        </div>
                    </div>

                    {/* Poster and Backdrop URLs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Poster URL</label>
                            <input
                                readOnly
                                disabled
                                type="url"
                                {...register('thumbnailUrl', {
                                    required: 'Poster URL is required',
                                    pattern: {
                                        value: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/,
                                        message: 'Invalid URL'
                                    }
                                })}
                                className="w-full bg-gray-600 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="https://example.com/poster.jpg"
                            />
                            {errors.thumbnailUrl && <p className="text-red-500">{errors.thumbnailUrl.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Backdrop URL</label>
                            <input
                                type="url"
                                readOnly
                                disabled
                                {...register('backdropUrl', {
                                    required: 'Backdrop URL is required',
                                    pattern: {
                                        value: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/,
                                        message: 'Invalid URL'
                                    }
                                })}
                                className="w-full bg-gray-600 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="https://example.com/backdrop.jpg"
                            />
                            {errors.backdropUrl && <p className="text-red-500">{errors.backdropUrl.message}</p>}
                        </div>
                    </div>

                    {/* Genres */}
                    <div>
                        <label className="block text-sm font-medium mb-3">Genres *</label>
                        <div className="flex flex-wrap gap-2">
                            {genres.map((genre) => {
                                const isSelected = selectedGenres?.some(g => g.id === genre.id);

                                return (
                                    <button
                                        key={genre.id}
                                        type="button"
                                        onClick={() => {
                                            const updatedGenres = isSelected
                                                ? selectedGenres.filter(g => g.id !== genre.id)
                                                : [...selectedGenres, genre];

                                            setValue("genres", updatedGenres, { shouldDirty: true });
                                        }}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isSelected
                                            ? "bg-red-600 text-white"
                                            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                            }`}
                                    >
                                        {genre.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Cast */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Cast</label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                {...register('newCastMember')}
                                className="flex-1 bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Add cast member name"
                            />
                            <button
                                type="button"
                                onClick={() => handleAddItem("cast", "newCastMember")}
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {cast.map((member, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg"
                                >
                                    <span className="text-sm">{member}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem("cast", index)}
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Crew */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Crew</label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                {...register('newCrewMember')}
                                className="flex-1 bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                placeholder="Add crew member name (e.g., Director, Composer)"
                            />
                            <button
                                type="button"
                                onClick={() => handleAddItem("crew", "newCrewMember")}
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {crew.map((member, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg"
                                >
                                    <span className="text-sm">{member}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem("crew", index)}
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={isPosting}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        Create Movie
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/movies")}
                        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
