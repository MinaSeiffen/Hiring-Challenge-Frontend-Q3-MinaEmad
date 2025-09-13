import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md"
import { Button } from "../../../Components/ui/button"
import type { PaginationType } from "../../../Types"

function DataTablePagination({
  pagination,
  setPagination,
}: {
  pagination: PaginationType
  setPagination: (val: PaginationType) => void
}) {
  const { pageSize, since, isLast } = pagination

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      {/* First Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPagination({ pageSize, since: 0, isLast: false })}
        disabled={since === 0}
        className="px-3 py-1"
      >
        <MdKeyboardDoubleArrowLeft />
      </Button>

      {/* Previous Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setPagination({
            pageSize,
            since: Math.max(since as number - pageSize, 0),
            isLast: false,
          })
        }
        disabled={since === 0 || isLast}
        className="px-3 py-1"
      >
        <MdKeyboardArrowLeft />
      </Button>

      {/* Next Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setPagination({
            pageSize,
            since: since as number + pageSize,
            isLast: false,
          })
        }
        disabled={isLast}
        className="px-3 py-1"
      >
        <MdKeyboardArrowRight />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setPagination({
            pageSize,
            isLast: true,
          })
        }
        disabled={isLast}
        className="px-3 py-1"
      >
        <MdKeyboardDoubleArrowRight />
      </Button>
    </div>
  )
}

export default DataTablePagination
