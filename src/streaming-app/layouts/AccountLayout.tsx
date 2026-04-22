
import { Outlet } from "react-router";
import { AccountNavbar } from "../components/user/AccountNavbar";
import { Footer } from "../components/shared";
import { AccountSidebar } from "../components/user/AccountSidebar";

export const AccountLayout = () => {
    return (
        <div className="min-h-screen bg-background dark">

            <AccountNavbar />
            {/* TODO Add Sidebar */}
            <div className="flex pt-20 pb-20 px-6 lg:px-12">
                <AccountSidebar />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
