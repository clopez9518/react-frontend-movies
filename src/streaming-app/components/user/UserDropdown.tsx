import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User } from "@/interfaces/entities/user.interface";
import { useAuthStore } from "@/store/auth.store";
import { useProfileStore } from "@/store/profile.store";
import { useGetProfiles } from "@/streaming-app/hooks/useUsers";
import { Link } from "react-router";
import { Loading } from "../shared";
import type { Profile } from "@/interfaces/entities/profile.interface";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    user: User
}

export function UserDropdown({ user }: Props) {

    const queryClient = useQueryClient();
    const { logout, selectProfile } = useAuthStore();
    const { activeProfile, setActiveProfile } = useProfileStore();
    const { data: profiles, isLoading } = useGetProfiles();

    const handleProfileSelect = async (profile: Profile) => {
        await selectProfile(profile.id)
        queryClient.invalidateQueries({ queryKey: ["movies"] });
        queryClient.invalidateQueries({ queryKey: ["my-list"] });
        setActiveProfile(profile)
    }

    if (isLoading) return <Loading />

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <div className="cursor-pointer w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm" style={{ fontWeight: 600 }}>
                    {activeProfile ? activeProfile.name.charAt(0).toUpperCase() : user?.email.charAt(0).toUpperCase()}
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="mt-2 dark">
                {/* <DropdownMenuItem asChild>
                    <Link to="/account">Profile</Link>
                </DropdownMenuItem> */}
                {
                    profiles?.map((profile) => (
                        <DropdownMenuItem key={profile.id} asChild>
                            <Link to="/" onClick={() => handleProfileSelect(profile)}>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm" style={{ fontWeight: 600 }}>
                                        {profile.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span>{profile.name}</span>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                    ))
                }
                <DropdownMenuItem asChild>
                    <Link to="/account">Account</Link>
                </DropdownMenuItem>

                {
                    user.role === 'admin' && (
                        <DropdownMenuItem asChild>
                            <Link to="/admin">Admin</Link>
                        </DropdownMenuItem>
                    )
                }

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}