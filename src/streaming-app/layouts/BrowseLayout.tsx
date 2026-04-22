import { Outlet } from "react-router"
import { GenreDropdown } from "../components/genre/GenreDropdown"

export const BrowseLayout = () => {
    return (
        <div className="relative">
            <Outlet />
            <div className="absolute top-0 left-0 right-0 pt-16 md:pt-20 pb-8 px-6 lg:px-12 border-gray-800">
                <GenreDropdown />
            </div>
        </div>
    )
}
