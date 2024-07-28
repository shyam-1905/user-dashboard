import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import UserList from "./pages/userList";
import Layout from "./layout/layout";
import "./App.css";
import Posts from "./pages/[userId]/posts";
import Todos from "./pages/[userId]/todos";
import Photos from "./pages/[userId]/photos";
import { ThemeProvider } from "./context/themeContext";
import NotFound from "./pages/notFound";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <UserList />,
      },
      {
        path: "users/:userId",
        element: <Dashboard />,
      },
      {
        path: "users/:userId/posts",
        element: <Posts />,
      },
      {
        path: "users/:userId/todos",
        element: <Todos />,
      },
      {
        path: "users/:userId/photos",
        element: <Photos />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
