import { motion } from "framer-motion"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card"
import type { User } from "../../Types"
import { ExternalLink } from "lucide-react"

interface UserCardProps {
  user: User
  index: number
}

export function UserCard({ user, index }: UserCardProps) {
  return (
    <motion.div
      key={user.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 120 }}
      whileHover={{ scale: 1.04 }}
      className="w-full"
    >
      <Card
        className="relative cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md hover:shadow-2xl transition-all duration-300"
        onClick={() => window.open(user.html_url, "_blank")}
      >
        {/* Top section */}
        <CardHeader className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full shadow-lg border-4 border-white"
            />
          </div>
          <CardTitle className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 transition-colors">
            {user.login}
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
            {user.type}
          </CardDescription>
        </CardHeader>

        {/* Middle */}
        <CardContent className="text-center">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            View on GitHub <ExternalLink size={14} />
          </a>
        </CardContent>
      </Card>
    </motion.div>
  )
}
