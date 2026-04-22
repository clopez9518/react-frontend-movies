import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useAuthStore } from '@/store/auth.store';
import { useProfileStore } from '@/store/profile.store';

export const WhosWatchingPage = () => {
    const navigate = useNavigate();
    const { user, selectProfile } = useAuthStore();

    const colors = [
        'from-blue-500 to-blue-600',
        'from-pink-500 to-pink-600',
        'from-green-500 to-green-600',
        'from-yellow-500 to-orange-500',
    ];

    const setActiveProfile = useProfileStore((state) => state.setActiveProfile);

    const handleProfileSelect = async (profileId: number) => {
        const selectedProfile = user?.profiles.find(p => p.id === profileId);
        if (selectedProfile) {
            await selectProfile(selectedProfile.id);
            setActiveProfile(selectedProfile);
        }
        // Navigate to home with selected profile
        navigate('/');
    };

    return (
        <div className="min-h-screen dark bg-background flex flex-col items-center justify-center px-6">
            {/* Logo */}
            <div className="absolute top-8 left-8">
                <button
                    onClick={() => navigate('/')}
                    className="text-primary text-2xl tracking-tight hover:opacity-80 transition-opacity"
                    style={{ fontWeight: 700 }}
                >
                    STREAMIFY
                </button>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-5xl">
                <h1 className="text-white text-5xl md:text-6xl text-center mb-12" style={{ fontWeight: 400, letterSpacing: '-0.02em' }}>
                    Who's watching?
                </h1>

                {/* Profiles Grid */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {user?.profiles.map((profile) => (
                        <motion.button
                            key={profile.id}
                            onClick={() => handleProfileSelect(profile.id)}
                            className="group flex flex-col items-center gap-3 focus:outline-none"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="relative">
                                {/* Avatar */}
                                <div
                                    className={`w-32 h-32 md:w-40 md:h-40 rounded border-4 border-transparent group-hover:border-white transition-all duration-200 flex items-center justify-center bg-gradient-to-br ${colors[Math.floor(Math.random() * colors.length)]} overflow-hidden`}
                                >
                                    <span className="text-white text-5xl md:text-6xl" style={{ fontWeight: 600 }}>
                                        {profile.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>


                                {/* Kids Badge */}
                                {profile.isKids && (
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-500 text-black text-xs rounded-full" style={{ fontWeight: 600 }}>
                                        KIDS
                                    </div>
                                )}
                            </div>

                            {/* Name */}
                            <span className="text-gray-400 group-hover:text-white text-lg transition-colors">
                                {profile.name}
                            </span>
                        </motion.button>
                    ))}
                </div>

            </div>
        </div>
    );
}