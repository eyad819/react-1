import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import About from "./pages/About";
import Erroe404 from "./pages/error/erroe404.jsx";
import Profile  from "./pages/Profile";
import {useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signin from './pages/Singin';
import Signiup from './pages/Singup';
import EditTask from './pages/edit.task/EditTask';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Erroe404/>
  },
  {
    path: "/signup",
    element: <Signiup/>,
  },
  {
    path: "/signin",
    element: <Signin/>,
  },
  {
    path: "/edit-task/:id",
    element: <EditTask/>,
  },

  {
    path: "/about",
    element: <About />,
  },

 
  {
    path: "/profile",
    element: <Profile />,
  },
]);
function App() {
  const {theme} = useContext(ThemeContext);

  return(
    <div className={`${theme}`}>
    <RouterProvider router={router} />
    
    </div>

  )       
  ;
}

export default App;
