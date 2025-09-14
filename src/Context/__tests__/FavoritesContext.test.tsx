import { renderHook, act } from '@testing-library/react';
import { useContext } from 'react';
import { FavoritesProvider } from '../FavoriteProvider';
import { FavoritesContext } from '../FavoritesContext';
import type { User } from '../../Types';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Custom hook to access context
const useFavorites = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  return { favorites, toggleFavorite };
};

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue('[]');
    localStorageMock.setItem.mockClear();
  });

  it('initializes with empty favorites', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    expect(result.current.favorites).toEqual([]);
  });

  it('loads favorites from localStorage on mount', () => {
    const mockFavorites = [{ id: 1 }, { id: 2 }];
    localStorageMock.getItem.mockReturnValue(JSON.stringify([1, 2]));

    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    expect(result.current.favorites).toEqual(mockFavorites);
  });

  it('toggles favorite correctly', () => {
    const mockUser: User = {
      login: 'testuser',
      id: 1,
      node_id: 'test-node-id',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/testuser',
      html_url: 'https://github.com/testuser',
      followers_url: 'https://api.github.com/users/testuser/followers',
      following_url: 'https://api.github.com/users/testuser/following{/other_user}',
      gists_url: 'https://api.github.com/users/testuser/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/testuser/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/testuser/subscriptions',
      organizations_url: 'https://api.github.com/users/testuser/orgs',
      repos_url: 'https://api.github.com/users/testuser/repos',
      events_url: 'https://api.github.com/users/testuser/events{/privacy}',
      received_events_url: 'https://api.github.com/users/testuser/received_events',
      type: 'User',
      user_view_type: 'User',
      site_admin: false,
    };

    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    // Add to favorites
    act(() => {
      result.current.toggleFavorite(mockUser);
    });

    expect(result.current.favorites).toContain(mockUser);

    // Remove from favorites
    act(() => {
      result.current.toggleFavorite(mockUser);
    });

    expect(result.current.favorites).not.toContain(mockUser);
  });

  it('saves favorites to localStorage when favorites change', () => {
    const mockUser: User = {
      login: 'testuser',
      id: 1,
      node_id: 'test-node-id',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/testuser',
      html_url: 'https://github.com/testuser',
      followers_url: 'https://api.github.com/users/testuser/followers',
      following_url: 'https://api.github.com/users/testuser/following{/other_user}',
      gists_url: 'https://api.github.com/users/testuser/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/testuser/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/testuser/subscriptions',
      organizations_url: 'https://api.github.com/users/testuser/orgs',
      repos_url: 'https://api.github.com/users/testuser/repos',
      events_url: 'https://api.github.com/users/testuser/events{/privacy}',
      received_events_url: 'https://api.github.com/users/testuser/received_events',
      type: 'User',
      user_view_type: 'User',
      site_admin: false,
    };

    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.toggleFavorite(mockUser);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'favoriteIds',
      JSON.stringify([1])
    );
  });
});
