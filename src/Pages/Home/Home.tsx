import { useEffect, useState, useMemo, useContext, useCallback, useRef } from "react";
import { FavoritesContext } from "../../Context/FavoritesContext";
import useDebouncedValue from "../../Hooks/useDebounceValue";
import { FaGithub } from "react-icons/fa";
import { PerPageDropdown } from "../../Components/main/PerPageDropdown";
import { getUserColumns } from "./Table/Colums";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../Components/ui/table";
import DataTablePagination from "./Table/DataTablePagination";
import useGetAll from "../../Hooks/users/uesGetAll";
import { toast } from "sonner";
import CustomLoader from "../../Components/main/CustomLoader";
import ErrorHandling from "../../Components/main/ErrorHandling";
import Search from "../../Components/main/Search";
import type { PaginationType, User } from "../../Types";

function Home() {
  const {data: users, error, fetchData, loading} = useGetAll()
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 800);
  const [pagination, setPagination] = useState<PaginationType>({
    pageSize: 10,
    since: 0, 
    isLast: false,
  })

  // New state for toggling between pagination and infinite scroll
  const [isPaginationMode, setIsPaginationMode] = useState(true);
  
  // State for infinite scroll
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const columns = useMemo(
    () => getUserColumns(favorites, toggleFavorite),
    [favorites, toggleFavorite]
  )

  // Table data based on current mode
  const tableData = isPaginationMode ? users : allUsers;

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: debouncedSearch,
    },
    onGlobalFilterChange: setSearch,
  })

  const loadMoreData = useCallback(async () => {
    if (infiniteLoading || !hasMore || isPaginationMode) return;
    
    setInfiniteLoading(true);
    try {
      const nextSince = allUsers.length > 0 ? allUsers[allUsers.length - 1].id : 0;
      
      await fetchData(10, nextSince, false);
      
      if (users && users.length > 0) {
        setAllUsers(prevUsers => {
          const newUsers = users.filter(newUser => 
            !prevUsers.some(existingUser => existingUser.id === newUser.id)
          );
          return [...prevUsers, ...newUsers];
        });
        
        if (users.length < 10) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error: Error | any) {
      toast.error("Error loading more users");
      setHasMore(false);
    } finally {
      setInfiniteLoading(false);
    }
  }, [allUsers, infiniteLoading, hasMore, isPaginationMode, fetchData, users]);

  useEffect(() => {
    if (!isPaginationMode && observerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !infiniteLoading && hasMore) {
            loadMoreData();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(observerRef.current);

      return () => observer.disconnect();
    }
  }, [isPaginationMode, loadMoreData, infiniteLoading, hasMore]);

  const handleModeSwitch = () => {
    setIsPaginationMode(!isPaginationMode);
    
    if (!isPaginationMode) {
      setAllUsers([]);
      setHasMore(true);
      setPagination({
        pageSize: 10,
        since: 0,
        isLast: false,
      });
    } else {
      setAllUsers(users || []);
    }
  };

  useEffect(() => {
    if (isPaginationMode) {
      fetchData(pagination.pageSize, pagination.since as number, pagination.isLast);
    }
  }, [pagination.pageSize, pagination.since, pagination.isLast, isPaginationMode]);

  useEffect(() => {
    if (!isPaginationMode && allUsers.length === 0) {
      fetchData(10, 0, false).then(() => {
        if (users) {
          setAllUsers(users);
        }
      });
    }
  }, [isPaginationMode, allUsers.length]);

  useEffect(() => {
    if (error) {
      toast.error("Error fetching users: " + error.message);
    }
  }, [error]);

  if (error) {    
    return (
      <ErrorHandling error={error} />
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
      <header className="flex md:flex-row flex-col justify-between items-center mb-8">
        <h1 className="text-lg md:text-3xl font-extrabold text-gray-700 dark:text-gray-200 tracking-tight flex items-center gap-2">
          <FaGithub className="text-blue-400" />
          GitHub Users
        </h1>
        <div className="items-center w-full md:w-1/3 mt-4 md:mt-0">
          <Search search={search} setSearch={setSearch} />
        </div>
      </header>

      {/* Mode Switch */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <span className={`text-sm font-medium ${isPaginationMode ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
            Pagination
          </span>
          <button
            onClick={handleModeSwitch}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isPaginationMode ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isPaginationMode ? 'translate-x-1' : 'translate-x-6'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${!isPaginationMode ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
            Infinite Scroll
          </span>
        </div>
      </div>

      {loading && isPaginationMode ? (
        <CustomLoader/>
      ) : (
        <>
          {!error && (
            <>
              <div className="overflow-hidden rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((hg) => (
                      <TableRow key={hg.id}>
                        {hg.headers.map((header) => (
                          <TableHead className="text-center" key={header.id}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell className="text-center" key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Infinite Scroll Loading Indicator */}
              {!isPaginationMode && (
                <div ref={observerRef} className="flex justify-center py-4">
                  {infiniteLoading && (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Loading more users...</span>
                    </div>
                  )}
                  {!hasMore && allUsers.length > 0 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">No more users to load</span>
                  )}
                </div>
              )}

              {/* Footer - Only show in pagination mode */}
              {isPaginationMode && (
                <div className="flex justify-between items-center mt-6 flex-col md:flex-row gap-4">
                  {/* Pagination */}
                  <DataTablePagination
                    pagination={pagination}
                    setPagination={setPagination}
                  />

                  {/* Dropdown for users per page */}
                  <div className="flex items-center gap-3">
                    <PerPageDropdown
                      value={pagination.pageSize}
                      onChange={(val) =>
                        setPagination((prev) => ({ ...prev, pageSize: val }))
                      }
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;