import { Loading, NotFound, Error } from "@/streaming-app/components/shared";
import { ContentRow } from "../../components/shared/ContentRow"
import { Hero } from "../../components/shared/Hero"
import { useHome } from "../../hooks/useHome";
import { useProfileStore } from "@/store/profile.store";

export const HomePage = () => {

  const { activeProfile } = useProfileStore();
  const {
    heroMovie,
    trendingMovies,
    topRatedMovies,
    newReleasesMovies,
    myListMovies,
    recentlyAddedMovies,
    isLoading,
    error } = useHome(activeProfile?.id.toString() ?? '');

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error title="Error fetching movies" />
  }

  if (trendingMovies?.length === 0 || !trendingMovies) {
    return <NotFound title="No movies found" />
  }

  return (
    <div>
      <Hero movie={heroMovie || trendingMovies[0]} />
      {/* Content */}
      <div className="dark relative z-10 pb-20 -mt-20">
        <ContentRow title="Trending Now" items={trendingMovies || []} />
        <ContentRow title="Recently Added" items={recentlyAddedMovies || []} />
        <ContentRow title="Top Rated" items={topRatedMovies || []} />
        <ContentRow title="New Releases" items={newReleasesMovies || []} />

        {
          myListMovies && myListMovies.length > 0 && <ContentRow title="My List" items={myListMovies || []} />
        }
      </div>
    </div>
  )
}
