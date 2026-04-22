import { Home, User, ArrowLeft, Lock, CreditCard } from "lucide-react";
import { Link, NavLink } from "react-router";

export function AccountSidebar() {
    return (
        <aside className="h-[50vh] w-64 border-r border-white/40 flex flex-col p-4">
            {/* Logo */}
            <Link to={'/'}>
                <div className="flex items-center gap-2 text-md font-bold mb-8 text-white">
                    <ArrowLeft size={18} />
                    <span>Back to Streamify</span>
                </div>
            </Link>

            {/* Links */}
            <nav className="flex flex-col gap-2 mt-2">
                <NavLink
                    to={'/account'}
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive
                            ? "bg-white text-black"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`
                    }
                >
                    <Home size={18} />
                    <span>Account</span>
                </NavLink>
            </nav>

            <nav className="flex flex-col gap-2 mt-2">
                <div
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition text-white/70 hover:bg-white/10 hover:text-white"
                >
                    <Lock size={18} />
                    <span>Security</span>
                </div>
            </nav>

            <nav className="flex flex-col gap-2 mt-2">
                <NavLink
                    to={'/account/profile'}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive
                            ? "bg-white text-black"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`
                    }
                >
                    <User size={18} />
                    <span>Profiles</span>
                </NavLink>
            </nav>

            <nav className="flex flex-col gap-2 mt-2">
                <div
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition text-white/70 hover:bg-white/10 hover:text-white"
                >
                    <CreditCard size={18} />
                    <span>Billing</span>
                </div>
            </nav>

            {/* User section */}
            <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20" />
                <div className="text-sm">
                    <p className="text-white">Usuario</p>
                    <p className="text-white/50 text-xs">ver perfil</p>
                </div>
            </div>
        </aside >
    );
}