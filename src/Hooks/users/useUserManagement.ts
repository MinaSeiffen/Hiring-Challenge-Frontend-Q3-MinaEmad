import { useState, useEffect, useCallback, useContext, useRef } from "react";
import useDebouncedValue from "../useDebounceValue";
import useGetAll from "./uesGetAll";
import { toast } from "sonner";
import type { PaginationType, User } from "../../Types";
import { FavoritesContext } from "../../Context/FavoritesContext";
import { getUserColumns } from "../../Pages/Home/Table/Colums";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

export const useUserManagement = () => {
  const { data: users, error, fetchData, loading } = useGetAll();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 800);
  const [pagination, setPagination] = useState<PaginationType>({
    pageSize: 10,
    since: 0,
    isLast: false,
  });

  const [isPaginationMode, setIsPaginationMode] = useState(true);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const columns = getUserColumns(favorites, toggleFavorite);

  const tableData = isPaginationMode ? users : allUsers;

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: debouncedSearch,
    },
    onGlobalFilterChange: setSearch,
  });

  const loadMoreData = useCallback(async () => {
    if (infiniteLoading || !hasMore || isPaginationMode) return;

    setInfiniteLoading(true);
    try {
      const nextSince = allUsers.length > 0 ? allUsers[allUsers.length - 1].id : 0;

      await fetchData(10, nextSince, false);

      if (users && users.length > 0) {
        setAllUsers(prevUsers => {
          const newUsers = users.filter(newUser =>
            !prevUsers.some(existingUser => existingUser.id === newUser.id)
          );
          return [...prevUsers, ...newUsers];
        });

        if (users.length < 10) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch {
      toast.error("Error loading more users");
      setHasMore(false);
    } finally {
      setInfiniteLoading(false);
    }
  }, [allUsers, infiniteLoading, hasMore, isPaginationMode, fetchData, users]);

  useEffect(() => {
    if (!isPaginationMode && observerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !infiniteLoading && hasMore) {
            loadMoreData();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(observerRef.current);

      return () => observer.disconnect();
    }
  }, [isPaginationMode, loadMoreData, infiniteLoading, hasMore]);

  const handleModeSwitch = () => {
    setIsPaginationMode(!isPaginationMode);

    if (!isPaginationMode) {
      setAllUsers([]);
      setHasMore(true);
      setPagination({
        pageSize: 10,
        since: 0,
        isLast: false,
      });
    } else {
      setAllUsers(users || []);
    }
  };

  useEffect(() => {
    if (isPaginationMode) {
      fetchData(pagination.pageSize, pagination.since as number, pagination.isLast);
    }
  }, [pagination.pageSize, pagination.since, pagination.isLast, isPaginationMode]);

  useEffect(() => {
    if (!isPaginationMode && allUsers.length === 0) {
      fetchData(10, 0, false).then(() => {
        if (users) {
          setAllUsers(users);
        }
      });
    }
  }, [isPaginationMode, allUsers.length]);

  useEffect(() => {
    if (error) {
      toast.error("Error fetching users: " + error.message);
    }
  }, [error]);

  return {
    users,
    error,
    loading,
    search,
    setSearch,
    pagination,
    setPagination,
    isPaginationMode,
    handleModeSwitch,
    table,
    infiniteLoading,
    hasMore,
    observerRef,
    columns,
  };
};
