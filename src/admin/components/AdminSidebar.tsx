import { Link, NavLink } from "react-router";
import { LayoutDashboard, Film, Users, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/movies", label: "Movies", icon: Film },
    { to: "/admin/users", label: "Users", icon: Users },
];

export const AdminSidebar = () => {

    const { user } = useAuthStore();

    return (
        <aside className="sticky top-0 h-screen w-64 shrink-0 dark bg-[#0F172A] border-r border-gray-800 flex flex-col">
            <div className="p-5 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <Link to={'/'}>
                        <div className="flex items-center gap-2 text-md px-2 py-1 font-bold text-white">
                            <ArrowLeft size={18} />
                            <span>Back to Streamify</span>
                        </div>
                    </Link>
                </div>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.to === "/"}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-primary text-white"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    }`
                                }
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-xs font-semibold">
                        {user?.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user?.email}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.role}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
