
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const AccountNavbar = () => {

    const [scrolled, setScrolled] = useState(false);
    const { user } = useAuthStore();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`dark fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4 transition-all duration-300 
        ${scrolled ? 'bg-[var(--background)]' : 'bg-linear-to-b from-black/80 to-transparent'
            }`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="text-[var(--primary)] text-2xl tracking-tight" style={{ fontWeight: 700 }}>
                        STREAMIFY
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    {user
                        ? <UserDropdown user={user} />
                        : <Link to="/auth/login"><Button>Login</Button></Link>
                    }
                </div>
            </div>

        </nav>
    )
}
