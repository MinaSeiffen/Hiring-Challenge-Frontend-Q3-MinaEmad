import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FavoritesContext } from "../Context/FavoritesContext";
import { UserCard } from "../Components/main/Card";
import useGetAll from "../Hooks/users/uesGetAll";
import { UserCardSkeleton } from "../Components/main/UserCardSkeleton";
import Search from "../Components/main/Search";
import useDebouncedValue from "../Hooks/useDebounceValue";

function Favourite() {
  const { favorites } = useContext(FavoritesContext);
  const { data: users, loading, fetchData } = useGetAll();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);

  const hasFetched = useRef(false);

  const { minId, maxId } = useMemo(() => {
    if (favorites.length === 0) return { minId: null, maxId: null };
    const ids = favorites.map((f) => f.id);
    return {
      minId: Math.min(...ids),
      maxId: Math.max(...ids),
    };
  }, [favorites]);

  useEffect(() => {
    if (maxId !== null && minId !== null && !hasFetched.current) {
      fetchData(maxId, minId - 1);
      hasFetched.current = true;
    }
  }, [minId, maxId]);

  const favoriteUsers = useMemo(() => {
    const favIds = favorites.map((f) => f.id);
    const filteredUsers = users.filter((user) => favIds.includes(user.id));
    if (!debouncedSearch) return filteredUsers;
    const lowerSearch = debouncedSearch.toLowerCase();
    return filteredUsers.filter(
      (user) =>
        user.login.toLowerCase().includes(lowerSearch)
    );
  }, [users, favorites, debouncedSearch]);

  if (favorites.length === 0) {
    hasFetched.current = false;
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
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-24 items-center">
            <h1 className="text-xl lg:text-3xl font-extrabold text-gray-800 dark:text-gray-200 mb-4 text-center md:text-left">
              GitHub Users <span className="text-blue-600">Explorer</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <UserCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between md:gap-16 items-center">
            <h1 className="text-xl lg:text-3xl font-extrabold text-gray-800 my-6 dark:text-gray-200 text-center md:text-left items-center w-full">
              GitHub Users <span className="text-blue-600">Explorer</span>
            </h1>
            <Search search={search} setSearch={setSearch} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {favoriteUsers.map((user, idx) => (
              <UserCard key={user.id} user={user} index={idx} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Favourite;
