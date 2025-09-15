import { Skeleton } from '../ui/skeleton'

function CustomLoader() {
  return (
<div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-center">
                <Skeleton className="h-6 w-full" />
              </th>
              <th className="p-4 text-center">
                <Skeleton className="h-6 w-full" />
              </th>
              <th className="p-4 text-center">
                <Skeleton className="h-6 w-full" />
              </th>
              <th className="p-4 text-center">
                <Skeleton className="h-6 w-full" />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b">
                <td className="p-4 text-center">
                  <Skeleton className="h-8 w-full" />
                </td>
                <td className="p-4 text-center">
                  <Skeleton className="h-8 w-full" />
                </td>
                <td className="p-4 text-center">
                  <Skeleton className="h-8 w-full" />
                </td>
                <td className="p-4 text-center">
                  <Skeleton className="h-8 w-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomLoader
