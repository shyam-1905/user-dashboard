import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-gray-100 dark:bg-black
    "
    >
      <Header />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
