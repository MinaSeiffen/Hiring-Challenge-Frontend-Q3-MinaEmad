import { render, screen } from '@testing-library/react';
import { UserCard } from '../Card';
import type { User } from '../../../Types';
import { FavoritesContext } from '../../../Context/FavoritesContext';

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

// simple mock provider
function renderWithFavorites(ui: React.ReactNode, favorites: User[] = []) {
  const toggleFavorite = jest.fn();
  return render(
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {ui}
    </FavoritesContext.Provider>
  );
}

describe('UserCard', () => {
  it('renders user information correctly', () => {
    renderWithFavorites(<UserCard user={mockUser} index={0} />);

    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('View on GitHub')).toBeInTheDocument();
  });

  it('renders user avatar', () => {
    renderWithFavorites(<UserCard user={mockUser} index={0} />);

    const avatar = screen.getByAltText('testuser');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/1?v=4'
    );
  });

  it('has correct GitHub link', () => {
    renderWithFavorites(<UserCard user={mockUser} index={0} />);

    const link = screen.getByText('View on GitHub').closest('a');
    expect(link).toHaveAttribute('href', 'https://github.com/testuser');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});