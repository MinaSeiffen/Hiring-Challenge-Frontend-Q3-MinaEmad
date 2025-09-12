import { useState } from "react";
import type { User } from "../../Types";
import AxiosInstance from "../../lib/AxiosInstance";

function useGetAll() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    await AxiosInstance.get<User[]>("/users?per_page=100")
        .then((response) => {
            setData(response.data);
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        })
  };


    return { data, loading, error, fetchData };
}

export default useGetAll;