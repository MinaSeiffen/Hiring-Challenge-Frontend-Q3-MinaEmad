import { ArrowUpDown, Star } from "lucide-react"
import { Button } from "../../../Components/ui/button"
import type { User } from "../../../Types"
import type {
  ColumnDef
} from "@tanstack/react-table"

export const getUserColumns = (
  favorites: User[],
  toggleFavorite: (user: User) => void
): ColumnDef<User>[] => [
  {
    accessorKey: "avatar_url",
    header: "Avatar",
    cell: ({ row }) => (
      <img
        src={row.original.avatar_url}
        alt={row.original.login}
        className="w-10 mx-auto h-10 rounded-full border border-blue-200 shadow-sm"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "login",
    header: ({ column }) => (
      <Button
        className="cursor-pointer"
        variant="ghost"
        onClick={() => 
          column.toggleSorting(column.getIsSorted() === "asc")
      }
      >
        Username
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <a
        href={row.original.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 font-medium hover:underline"
      >
        {row.original.login}
      </a>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        className="cursor-pointer"
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "favorite",
    header: "Favorite",
    cell: ({ row }) => {
      const user = row.original
      const isFav = favorites.some((f) => f.id === user.id)
      return (
        <button
          onClick={() => toggleFavorite(user)}
          className="text-2xl transition hover:scale-125"
          aria-label="Favorite"
        >
          <Star
            className={`h-6 w-6 ${
              isFav ? "text-blue-400 fill-blue-400" : "text-gray-400"
            }`}
          />
        </button>
      )
    },
    enableSorting: false,
  },
]