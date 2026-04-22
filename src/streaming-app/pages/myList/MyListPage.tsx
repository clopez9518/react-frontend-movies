import { MovieGrid } from "@/streaming-app/components/movie/MovieGrid"

import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useProfileStore } from "@/store/profile.store";
import { useGetMyList } from "@/streaming-app/hooks/useMyList";

export const MyListPage = () => {

    const { activeProfile } = useProfileStore()
    const { data: movies } = useGetMyList(activeProfile?.id.toString() || '')

    return (
        <div className="pt-20 pb-20">
            <h1 className="text-2xl font-bold mb-6 px-6 lg:px-12 text-white">My List</h1>

            {!activeProfile && (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                    <p className="text-gray-400">Please login to add movies to your list</p>
                    <Link to="/auth/login">
                        <Button className="text-lg" variant="link">Login</Button>
                    </Link>
                </div>
            )}

            {activeProfile && movies?.length === 0 && (
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-gray-400">Your list is empty</p>
                </div>
            )}

            {activeProfile && movies && movies.length > 0 && (
                <MovieGrid movies={movies} />
            )}
        </div>
    )
}
