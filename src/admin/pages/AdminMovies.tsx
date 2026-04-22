import { DataTable } from "../components/DataTable"
import { getMoviesAdmin } from "../hooks/useAdminMovies"
import { columns } from "../components/movies/MoviesColumns"
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AdminMovies = () => {

    const { data: movies } = getMoviesAdmin();
    const inputFilter = {
        placeholder: "Filter movies by title...",
        column: "title",
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-semibold">Movies</h1>
                <p className="text-gray-400 mt-1">Manage your movies</p>
            </div>

            <div className="flex justify-end">
                <Link to="/admin/movies/new">
                    <Button
                        className="bg-primary text-white"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Movie
                    </Button>
                </Link>
            </div>
            {/* TODO ADD TABLE */}
            <DataTable columns={columns} data={movies || []} inputFilter={inputFilter} />
        </div>
    )
}
