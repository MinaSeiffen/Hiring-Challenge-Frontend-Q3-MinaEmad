import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout'
import Home from './Pages/Home/Home'
import Favourite from './Pages/Favourite'
import { FavoritesProvider } from './Context/FavoriteProvider'
import { ThemeProvider } from './Context/Theme'


function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (<FavoritesProvider><AppLayout /></FavoritesProvider>),
      children: [
        {
          index: true,
          element: <Home/>
        },
        {
          path: "favorites",
          element: <Favourite/>
        }
      ]
    }
  ])

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <RouterProvider router={routes} />
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App
