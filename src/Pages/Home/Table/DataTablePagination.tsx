import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md"
import { Button } from "../../../Components/ui/button"

function DataTablePagination({ table }: { table: any }) {
  const page = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      {/* First Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        className="px-3 py-1"
      >
        <MdKeyboardDoubleArrowLeft />
      </Button>

      {/* Previous Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="px-3 py-1"
      >
        <MdKeyboardArrowLeft />
      </Button>

      {/* Page info */}
      <span className="px-4 py-1 text-gray-700 text-sm font-semibold">
        <span className="text-blue-600">{page}</span> of{" "}
        <span className="text-blue-600">{totalPages}</span>
      </span>

      {/* Next Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="px-3 py-1"
      >
        <MdKeyboardArrowRight />
      </Button>

      {/* Last Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(totalPages - 1)}
        disabled={!table.getCanNextPage()}
        className="px-3 py-1"
      >
        <MdKeyboardDoubleArrowRight />
      </Button>
    </div>
  )
}

export default DataTablePagination