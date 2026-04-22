import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { useGetProfiles } from "@/streaming-app/hooks/useUsers";
import { Error, Loading } from "@/streaming-app/components/shared";

export const AccountPage = () => {
    const { user } = useAuthStore();
    const { data: profiles, isLoading, error } = useGetProfiles();

    if (isLoading) return <Loading />
    if (error) return <Error title={error.message} />

    return (
        <div className="mb-6 px-6 lg:px-12">
            <h1 className="text-2xl font-bold text-white">Account</h1>
            <p className="text-gray-400">Manage your account information and preferences</p>

            <div className="mt-6">
                <h2 className="text-xl font-bold text-white">Email</h2>
                <p className="text-gray-400">{user?.email}</p>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold text-white">Profiles</h2>
                <div className="flex flex-wrap gap-4 mt-4">
                    {profiles?.map((profile) => (
                        <div key={profile.id} className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm" style={{ fontWeight: 600 }}>
                                {profile.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-white">{profile.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <p className="font-bold text-white">Deactivate my account</p>
                <Button className="mt-2" variant="destructive">Deactivate</Button>
            </div>


        </div>
    )
}
