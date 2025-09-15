import { FaGithub } from "react-icons/fa";
import CustomLoader from "../../Components/main/CustomLoader";
import ErrorHandling from "../../Components/main/ErrorHandling";
import Search from "../../Components/main/Search";
import { useUserManagement } from "../../Hooks/users/useUserManagement";
import { ModeSwitch } from "../../Components/main/ModeSwitch";
import { InfiniteScrollLoader } from "../../Components/main/InfiniteScrollLoader";
import { UserTable } from "./Table";

function Home() {
  const {
    error,
    loading,
    search,
    setSearch,
    pagination,
    setPagination,
    isPaginationMode,
    handleModeSwitch,
    table,
    infiniteLoading,
    hasMore,
    observerRef,
    columns,
  } = useUserManagement();

  if (error) {
    return <ErrorHandling error={error} />;
  }

  return (
    <div className="w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
      <header className="flex md:flex-row flex-col justify-between items-center mb-8">
        <h1 className="text-lg md:text-3xl font-extrabold text-gray-700 dark:text-gray-200 tracking-tight flex items-center gap-2">
          <FaGithub className="text-blue-400" />
          GitHub Users
        </h1>
        <div className="items-center w-full md:w-1/3 mt-4 md:mt-0">
          <Search search={search} setSearch={setSearch} />
        </div>
      </header>

      <ModeSwitch
        isPaginationMode={isPaginationMode}
        handleModeSwitch={handleModeSwitch}
      />

      {loading && isPaginationMode ? (
        <CustomLoader />
      ) : (
        <>
          {!error && (
            <>
              <UserTable
                table={table}
                columns={columns}
                isPaginationMode={isPaginationMode}
                pagination={pagination}
                setPagination={setPagination}
              />

              <InfiniteScrollLoader
                isPaginationMode={isPaginationMode}
                infiniteLoading={infiniteLoading}
                hasMore={hasMore}
                allUsersLength={table.getRowModel().rows.length}
                observerRef={observerRef}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
