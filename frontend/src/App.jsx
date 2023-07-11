import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Game from "./Pages/Game/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/game",
    element: <Game />,
  }
]);

function App() {

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
