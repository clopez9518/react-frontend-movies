import { Outlet } from "react-router"
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminNavbar } from "../components/AdminNavbar";

export const AdminLayout = () => {
    return (
        <div className="flex min-h-screen w-full bg-background dark text-gray-100">
            <AdminSidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <AdminNavbar />
                <main className="flex-1 p-8 dark bg-background">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
