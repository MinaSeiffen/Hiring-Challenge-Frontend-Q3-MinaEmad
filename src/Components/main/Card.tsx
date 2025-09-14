import { motion } from "framer-motion" 
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
} from "../ui/card" 
import type { User } from "../../Types" 
import { ExternalLink, Star } from "lucide-react" 
import { useContext } from "react" 
import { FavoritesContext } from "../../Context/FavoritesContext" 
import { toast } from "sonner" 
 
interface UserCardProps { 
  user: User 
  index: number 
} 
 
export function UserCard({ user, index }: UserCardProps) { 
  const { favorites, toggleFavorite } = useContext(FavoritesContext) 
 
  const isFav = favorites.some((f) => f.id === user.id) 
 
  const handleToggle = (e: React.MouseEvent) => { 
    e.preventDefault() // Add this to prevent any default behavior
    e.stopPropagation() 
    // Remove the duplicate e.stopPropagation()
    
    toggleFavorite(user) 
 
    if (isFav) { 
      toast.success(`${user.login} removed from favorites`, { 
        action: { 
          label: "Undo", 
          onClick: () => toggleFavorite(user), 
        }, 
      }) 
    } else { 
      toast.success(`${user.login} added to favorites`) 
    } 
  } 

  const handleGitHubClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(user.html_url, "_blank")
  }
 
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
        className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md hover:shadow-2xl transition-all duration-300" 
      > 
        {/* Favorite toggle */} 
        <button 
          type="button" 
          onClick={handleToggle}
          className="absolute top-3 right-3 transition hover:scale-125 z-10" 
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        > 
          <Star 
            className={`h-6 w-6 ${ 
              isFav ? "text-blue-400 fill-blue-400" : "text-gray-400" 
            }`} 
          /> 
        </button> 
 
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
          <button
            onClick={handleGitHubClick}
            className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline bg-transparent border-0 p-0 cursor-pointer"
          > 
            View on GitHub <ExternalLink size={14} /> 
          </button>
        </CardContent> 
      </Card> 
    </motion.div> 
  ) 
}