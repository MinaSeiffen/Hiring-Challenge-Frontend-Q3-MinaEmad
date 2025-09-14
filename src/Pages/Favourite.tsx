import { useContext, useEffect, useMemo } from "react";
import { FavoritesContext } from "../Context/FavoritesContext";
import { UserCard } from "../Components/main/Card";
import useGetAll from "../Hooks/users/uesGetAll";
import { UserCardSkeleton } from "../Components/main/UserCardSkeleton";

function Favourite() {
  const { favorites } = useContext(FavoritesContext);
  const { data: users, loading, fetchData } = useGetAll();

  // Compute min & max IDs
  const { minId, maxId } = useMemo(() => {
    if (favorites.length === 0) return { minId: null, maxId: null };
    const ids = favorites.map((f) => f.id);
    return {
      minId: Math.min(...ids),
      maxId: Math.max(...ids),
    };
  }, [favorites]);

  useEffect(() => {
    if (maxId !== null && minId !== null) {
      // Example: fetch 10 users starting from lowest id
      fetchData(maxId, minId - 1);
    }
  }, [minId, maxId]);

  const favoriteUsers = useMemo(() => {
    const favIds = favorites.map(f => f.id);
    return users.filter(user => favIds.includes(user.id));
  }, [users, favorites]);

  if (favorites.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        No favourite users found.
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 transition-colors duration-300">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 mb-8 text-center">
            GitHub Users <span className="text-blue-600">Explorer</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <UserCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 transition-colors duration-300">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 mb-8 text-center">
            GitHub Users <span className="text-blue-600">Explorer</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteUsers.map((user, idx) => (
              <UserCard key={user.id} user={user} index={idx} />
            ))}
          </div>
        </div>
      )}
    </>
  )

}

export default Favourite;