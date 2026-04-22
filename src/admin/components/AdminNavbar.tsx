
import { useAuthStore } from "@/store/auth.store";
import { UserDropdown } from "@/streaming-app/components/user/UserDropdown";


export const AdminNavbar = () => {

    const { user } = useAuthStore();

    return (
        <header className="sticky top-0 z-20 h-18 border-b border-gray-800 bg-background dark flex items-center justify-between px-6">
            <div className="flex">
                <div className="relative flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-2">
                        <div className="text-[var(--primary)] text-2xl tracking-tight" style={{ fontWeight: 700 }}>
                            STREAMIFY
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 ml-8">
                {
                    user && <UserDropdown user={user} />
                }
            </div>
        </header>
    );
}
