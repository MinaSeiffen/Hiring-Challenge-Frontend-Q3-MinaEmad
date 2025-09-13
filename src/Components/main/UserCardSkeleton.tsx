import { Card, CardHeader, CardContent, CardFooter } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export function UserCardSkeleton() {
  return (
    <Card className="w-72 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
      <CardHeader className="flex flex-col items-center text-center space-y-3">
        <Skeleton className="w-24 h-24 rounded-full" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-16" />
      </CardHeader>
      <CardContent className="flex justify-center">
        <Skeleton className="h-4 w-24" />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Skeleton className="h-3 w-32" />
      </CardFooter>
    </Card>
  )
}
