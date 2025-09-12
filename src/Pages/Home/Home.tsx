import { useEffect, useState, useMemo, useContext } from "react";
import { FavoritesContext } from "../../Context/FavoritesContext";
import useDebouncedValue from "../../Hooks/useDebounceValue";
import { FaGithub } from "react-icons/fa";
import { PerPageDropdown } from "../../Components/main/PerPageDropdown";
import { getUserColumns } from "./Table/Colums";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../Components/ui/table";
import DataTablePagination from "./Table/DataTablePagination";
import useGetAll from "../../Hooks/users/uesGetAll";
import { toast } from "sonner";
import CustomLoader from "../../Components/main/CustomLoader";
import ErrorHandling from "../../Components/main/ErrorHandling";
import Search from "../../Components/main/Search";


function Home() {
  const {data:users, error, fetchData, loading} = useGetAll()
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 800);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const columns = useMemo(
    () => getUserColumns(favorites, toggleFavorite),
    [favorites, toggleFavorite]
  )

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: debouncedSearch,
      pagination,
    },
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination, 
  });

  useEffect(() => {
    fetchData();
  }, []);

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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <header className="flex md:flex-row flex-col justify-between items-center mb-8">
        <h1 className="text-lg md:text-3xl font-extrabold text-gray-700 tracking-tight flex items-center gap-2">
          <FaGithub className="text-blue-400" />
          GitHub Users
        </h1>
        <div className="items-center w-full md:w-1/3 mt-4 md:mt-0">
          <Search search={search} setSearch={setSearch} />
        </div>
      </header>

      {loading ? (
        <CustomLoader/>
      ) : (
        <>
          {!error && !loading && (
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

              {/* Footer */}
              <div className="flex justify-between items-center mt-6 flex-col md:flex-row gap-4">
                {/* Pagination */}
                <DataTablePagination table={table} />

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
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;