import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout'
import Home from './Pages/Home/Home'
import Favourite from './Pages/Favourite'
import { FavoritesProvider } from './Context/FavoriteProvider'


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
          path: "favorite",
          element: <Favourite/>
        }
      ]
    }
  ])

  return (
    <FavoritesProvider>
      <RouterProvider router={routes} />
    </FavoritesProvider>
  )
}

export default App
