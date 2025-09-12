import { useState, useEffect, ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";
import type { User } from "../Types";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<User[]>([]);

  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem("favoriteIds") || "[]");
    if (storedIds.length > 0) {
      setFavorites(storedIds.map((id: number) => ({ id } as User))); 
    }
  }, []);

  useEffect(() => {
    const ids = favorites.map((u) => u.id);
    localStorage.setItem("favoriteIds", JSON.stringify(ids));
  }, [favorites]);

  const toggleFavorite = (user: User) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === user.id)
        ? prev.filter((f) => f.id !== user.id) 
        : [...prev, user] 
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
