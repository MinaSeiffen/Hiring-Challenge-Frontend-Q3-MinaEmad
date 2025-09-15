import React from "react";
import { flexRender, type Table as ReactTableType, type ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../Components/ui/table";
import type { PaginationType, User } from "../../../Types";
import DataTablePagination from "./DataTablePagination";
import { PerPageDropdown } from "../../../Components/main/PerPageDropdown";

interface UserTableProps {
  table: ReactTableType<User>;
  columns: ColumnDef<User>[];
  isPaginationMode: boolean;
  pagination: PaginationType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
}

export const UserTable: React.FC<UserTableProps> = ({
  table,
  columns,
  isPaginationMode,
  pagination,
  setPagination,
}) => {
  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead className="text-center" key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
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

      {isPaginationMode && (
        <div className="flex justify-between items-center mt-6 flex-col md:flex-row gap-4">
          {/* Pagination */}
          <DataTablePagination pagination={pagination} setPagination={setPagination} />

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
  );
};
