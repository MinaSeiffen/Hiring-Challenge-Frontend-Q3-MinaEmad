"use client"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface PerPageDropdownProps {
  value: number
  onChange: (val: number) => void
}

export function PerPageDropdown({ value, onChange }: PerPageDropdownProps) {
  const options = [ 5, 10 ]

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-600 whitespace-nowrap">
        Show
      </label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-40 justify-between font-medium"
          >
            {value} per page
            <span className="ml-2 text-gray-400">▼</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>Users per page</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {options.map((n) => (
            <DropdownMenuItem
              key={n}
              onClick={() => onChange(n)}
              className={value === n ? "bg-blue-50 text-blue-600" : ""}
            >
              {n} per page
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
