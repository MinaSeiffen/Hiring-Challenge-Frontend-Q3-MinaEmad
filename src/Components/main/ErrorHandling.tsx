
function ErrorHandling({error}: {error: Error | null}) {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-xl mt-2 text-center">
        <img src="/error.webp" alt="error" width={400} height={300} className="mx-auto" />
        <p className="text-2xl text-red-500 font-semibold ">{error ? error?.message?.toString() : "There is something went wrong!!"}</p>
    </div>
  )
}

export default ErrorHandling