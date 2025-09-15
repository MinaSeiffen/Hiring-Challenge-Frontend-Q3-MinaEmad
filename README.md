# GitHub Users Explorer - Extreme Solution Challenge

A modern, responsive web application that fetches and displays GitHub users with advanced features including pagination, search, favorites management, and dark mode support.

## 🚀 Features

### Core Requirements ✅
- **GitHub API Integration**: Fetches users from `https://api.github.com/users`
- **Pagination**: Complete pagination with First/Previous/Next/Last buttons (5-10 users per page)
- **Search Functionality**: Real-time search within fetched data with debouncing (800ms)
- **Favorites System**: Add/remove users to favorites with localStorage persistence
- **React Router**: Navigation between Home (`/`) and Favorites (`/favorites`) pages
- **Responsive UI**: Clean, modern interface with mobile-first design
- **Error Handling**: Comprehensive error states and loading indicators

### Bonus Features ✅
- **Dark Mode Support**: Toggle between light and dark themes with system preference detection
- **Debounced Search**: Optimized search performance with 800ms delay
- **Enhanced Error Handling**: Meaningful error messages and retry mechanisms
- **Unit Tests**: Jest testing setup with React Testing Library
- **Docker Support**: Containerized application with Docker and Docker Compose

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Radix UI components
- **State Management**: React Context API
- **Routing**: React Router DOM v7
- **Data Fetching**: Axios with custom hooks
- **Testing**: Jest, React Testing Library
- **Build Tool**: Vite
- **Containerization**: Docker, Docker Compose

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ExtremeSol
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Linting
npm run lint         # Run ESLint
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start the application
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop the application
docker-compose down
```

### Using Docker directly

```bash
# Build the image
docker build -t extreme-sol-app .

# Run the container
docker run -p 3000:3000 extreme-sol-app
```

The application will be available at `http://localhost:3000`

## 🏗️ Technical Architecture

### Project Structure
```
src/
├── Components/          # Reusable UI components
│   ├── main/           # Main application components
│   └── ui/             # Base UI components (Radix UI)
├── Context/            # React Context providers
├── Hooks/              # Custom React hooks
├── Pages/              # Page components
├── Types/              # TypeScript type definitions
├── lib/                # Utility functions and configurations
└── setupTests.ts       # Jest test setup
```

### Key Components

#### State Management
- **FavoritesProvider**: Manages favorites state with localStorage persistence
- **ThemeProvider**: Handles dark/light mode theme switching

#### Custom Hooks
- **useGetAll**: Fetches GitHub users with pagination and error handling
- **useDebouncedValue**: Implements debounced search functionality

#### Data Flow
1. **Data Fetching**: `useGetAll` hook fetches users from GitHub API
2. **Pagination**: State-managed pagination with `since` parameter
3. **Search**: Client-side filtering using TanStack Table
4. **Favorites**: Context-based state with localStorage persistence

### API Integration

The application uses two GitHub API endpoints:
- **Users API**: `GET /users?per_page={limit}&since={id}` for pagination
- **Search API**: `GET /search/users?q=created:>{date}` for fallback data

### Performance Optimizations

- **Debounced Search**: 800ms delay to prevent excessive API calls
- **Memoized Components**: React.memo for expensive components
- **Lazy Loading**: Code splitting with React.lazy
- **Efficient Re-renders**: Optimized state updates and context usage

## 🧪 Testing

### Test Coverage
- **Component Tests**: UserCard, FavoritesContext
- **Hook Tests**: Custom hooks with React Testing Library
- **Integration Tests**: User interactions and state management

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🎨 UI/UX Features

### Design System
- **Modern UI**: Clean, professional design with subtle animations
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Dark Mode**: System preference detection with manual toggle

### User Experience
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages with retry options
- **Smooth Animations**: Framer Motion for micro-interactions
- **Intuitive Navigation**: Clear visual hierarchy and navigation patterns

## 🔧 Configuration

### Environment Variables
Create a `.env` file for custom configurations:
```env
VITE_GITHUB_API_URL=https://api.github.com
VITE_APP_TITLE=GitHub Users Explorer
```

### Tailwind Configuration
The project uses Tailwind CSS 4 with custom configuration in `tailwind.config.js`

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- GitHub API for providing user data
- Radix UI for accessible component primitives
- Tailwind CSS for utility-first styling
- React team for the amazing framework
- Vite for the fast build tool

---

**Built with ❤️ for the Extreme Solution hiring challenge**