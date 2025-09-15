import { createContext } from "react";
import type { User } from "../Types";

export type FavoritesContextType = {
  favorites: User[];
  toggleFavorite: (user: User) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
});
