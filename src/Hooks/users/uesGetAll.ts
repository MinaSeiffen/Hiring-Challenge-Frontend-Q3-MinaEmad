import { useState } from "react";
import type { SearchUser, User } from "../../Types";
import AxiosInstance from "../../lib/AxiosInstance";
import { DateFormatter } from "../../lib/utils";

function useGetAll() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const today = new Date().toISOString().split("T")[0];

  const fetchData = async (
    perPage: number,
    since: number,
    isLast: boolean = false
    ): Promise<User[] | undefined> => {
        setLoading(true);
        setError(null);

        const fetchUsersForDate = async (date: Date): Promise<User[]> => {
            const dateStr = DateFormatter(date);
            const searchUrl = `/search/users?q=created:>${dateStr}&sort=joined&order=desc&per_page=${perPage}`;

            const response = await AxiosInstance.get<SearchUser>(searchUrl);
            return response.data.items || [];
        };

        try {
            if (isLast) {
                const currentDate = new Date(today);
                let users: User[] = [];
                let daysBack = 0;
                const maxDaysBack = 7;

                while (users.length === 0 && daysBack <= maxDaysBack) {
                    try {
                        users = await fetchUsersForDate(currentDate);

                        if (users.length > 0) {
                            setData(users);
                            return users; 
                        }

                        daysBack++;
                        currentDate.setDate(currentDate.getDate() - 1);
                        } catch (dateError) {
                        console.warn(
                            `Error fetching users for ${DateFormatter(currentDate)}:`,
                            dateError
                        );
                        daysBack++;
                        currentDate.setDate(currentDate.getDate() - 1);
                    }
                }

                if (users.length === 0) {
                    setError(new Error(`No users found in the last ${maxDaysBack} days`));
                    return []; 
                }
            } else {
                const url = `/users?per_page=${perPage}&since=${since}`;
                const response = await AxiosInstance.get<User[]>(url);
                setData(response.data);
                return response.data; 
            }
        } catch (err) {
            setError(err as Error);
            return []; 
        } finally {
            setLoading(false);
        }
    };


  return { data, loading, error, fetchData };
}

export default useGetAll;