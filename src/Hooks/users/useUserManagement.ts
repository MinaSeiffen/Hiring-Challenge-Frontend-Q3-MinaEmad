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

  const loadingRef = useRef(false);

  const loadMoreData = useCallback(async () => {
    if (infiniteLoading || !hasMore || isPaginationMode || search.length !== 0) return;

    loadingRef.current = true;
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
      loadingRef.current = false;
    }
  }, [infiniteLoading, hasMore, isPaginationMode, users, allUsers, search]);

  useEffect(() => {
    if (!isPaginationMode && observerRef.current && search.length === 0) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      }, { threshold: 0.1 });

      const node = observerRef.current;
      observer.observe(node);

      return () => {
        if (node) observer.unobserve(node);
      };
    }
  }, [isPaginationMode, infiniteLoading, hasMore, search, loadMoreData]);

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
    if (isPaginationMode && search.length === 0) {
      fetchData(pagination.pageSize, pagination.since as number, pagination.isLast);
    }
  }, [pagination.pageSize, pagination.since, pagination.isLast, isPaginationMode]);

  useEffect(() => {
    if (!isPaginationMode && allUsers.length === 0 && search.length === 0) {
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
