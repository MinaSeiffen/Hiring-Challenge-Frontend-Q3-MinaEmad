import { Skeleton } from '../ui/skeleton'

function CustomLoader() {
  return (
    <div className="flex justify-center items-center h-40">
        <div className="flex flex-col space-y-3">
        <Skeleton className="h-[25px] w-[200px] md:w-[600px] rounded-xl" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-[200px] md:w-[600px] " />
            <Skeleton className="h-4 w-[200px] md:w-[600px]" />
            <Skeleton className="h-4 w-[200px] md:w-[600px]" />
            <Skeleton className="h-4 w-[200px] md:w-[600px]" />
            <Skeleton className="h-4 w-[200px] md:w-[600px]" />
        </div>
        </div>
    </div>
  )
}

export default CustomLoader