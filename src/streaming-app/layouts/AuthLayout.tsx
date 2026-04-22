
import { Outlet } from "react-router";

export const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-background dark flex items-center justify-center">
            <Outlet />
        </div>
    )
}