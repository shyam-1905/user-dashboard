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
import { UserProvider } from "./context/userContext";
import WithUserValidation from "./components/withValidUser";

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
        element: (
          <WithUserValidation>
            <Posts />
          </WithUserValidation>
        ),
      },
      {
        path: "users/:userId/todos",
        element: (
          <WithUserValidation>
            <Todos />
          </WithUserValidation>
        ),
      },
      {
        path: "users/:userId/photos",
        element: (
          <WithUserValidation>
            <Photos />
          </WithUserValidation>
        ),
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
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
