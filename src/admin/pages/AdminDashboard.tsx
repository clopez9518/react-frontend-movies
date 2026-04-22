import { Film, Users, TrendingUp, Calendar, Plus } from "lucide-react";
import { getMoviesAdmin } from "../hooks/useAdminMovies";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { Loading, Error } from "@/streaming-app/components/shared";


export const AdminDashboard = () => {

    const { data: movies, isLoading, error } = getMoviesAdmin();
    const { users } = useAdminUsers();

    const totalMovies = movies?.length;
    const totalUsers = users?.length;
    const mostPopular = movies?.reduce((prev, current) =>
        (prev.rating > current.rating) ? prev : current
    );

    const latestMovies = [...movies || []].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);


    if (isLoading) return <Loading />;
    if (error) return <Error title={error.message} />;


    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">Dashboard</h1>
                    <p className="text-gray-400 mt-1">Welcome back, Admin</p>
                </div>
                <Link
                    to="/admin/movies/new"
                >
                    <Button
                        className="bg-primary text-white px-6 py-5"
                    >
                        <Plus className="w-5 h-5" />
                        Create Movie
                    </Button>
                </Link>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#141414] border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Movies</p>
                            <p className="text-3xl font-semibold mt-2">{totalMovies}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center">
                            <Film className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">12%</span>
                        <span className="text-gray-400">from last month</span>
                    </div>
                </div>

                <div className="bg-[#141414] border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Users</p>
                            <p className="text-3xl font-semibold mt-2">{totalUsers?.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-600/10 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">8%</span>
                        <span className="text-gray-400">from last month</span>
                    </div>
                </div>

                <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 md:col-span-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Most Rated Movie</p>
                            <p className="text-xl font-semibold mt-2">{mostPopular?.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-sm font-medium">{mostPopular?.rating}</span>
                                </div>
                                <span className="text-gray-400 text-sm">• {mostPopular?.genres.map((genre) => genre.name).join(", ")}</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-yellow-600/10 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recently Added Movies */}
            <div className="bg-[#141414] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-red-600" />
                        Recently Added Movies
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {latestMovies?.map((movie) => (
                        <Link key={movie.id} to={`/admin/movies/${movie.id}/edit`}>
                            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden hover:border-red-600 transition-colors">
                                <img src={movie.backdropUrl} alt={movie.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold">{movie.title}</h3>
                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                                        <span className="text-yellow-500">★</span>
                                        <span>{movie.rating}</span>
                                        <span>•</span>
                                        <span>{movie.releaseYear}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}