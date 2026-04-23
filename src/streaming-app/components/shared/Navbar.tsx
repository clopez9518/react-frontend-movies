import { useEffect, useState } from "react";
import { Link } from "react-router";
import { UserDropdown } from "../user/UserDropdown";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";

export const Navbar = () => {

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

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-[var(--text-primary)] hover:text-gray-300 transition-colors text-sm">
              Home
            </Link>
            <Link to="/browse" className="text-[var(--text-primary)] hover:text-gray-300 transition-colors text-sm">
              Browse
            </Link>
            <Link to="/mylist" className="text-[var(--text-primary)] hover:text-gray-300 transition-colors text-sm">
              My List
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {user
            ? <UserDropdown user={user} />
            : <Link to="/auth/login"><Button>Login</Button></Link>
          }
          {/* <button className="text-[var(--text-primary)] hover:text-gray-300 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-[var(--text-primary)] hover:text-gray-300 transition-colors">
            <Bell className="w-5 h-5" />
          </button> */}
        </div>
      </div>

    </nav>
  )
}
