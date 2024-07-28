// src/components/Header.tsx
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./modeToggle";

const Header: React.FC = () => {
  const location = useLocation();
  const { userId } = useParams<{ userId: string }>();
  const isUserPage = location.pathname.startsWith("/users/");

  const getMenuItemClass = (path: string) => {
    return cn(
      "transition-colors w-full justify-start px-3 py-2 rounded-md text-sm font-medium",
      location.pathname === path
        ? "bg-primary text-primary-foreground hover:bg-secondary/90"
        : "bg-transparent hover:bg-accent hover:text-accent-foreground"
    );
  };

  const MenuItems = () => (
    <>
      <Button
        asChild
        variant="ghost"
        className={getMenuItemClass(`/users/${userId}`)}
      >
        <Link to={`/users/${userId}`}>Profile</Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        className={getMenuItemClass(`/users/${userId}/posts`)}
      >
        <Link to={`/users/${userId}/posts`}>Posts</Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        className={getMenuItemClass(`/users/${userId}/todos`)}
      >
        <Link to={`/users/${userId}/todos`}>Todos</Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        className={getMenuItemClass(`/users/${userId}/photos`)}
      >
        <Link to={`/users/${userId}/photos`}>Photos</Link>
      </Button>
    </>
  );

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            <Link to="/">User Dashboard</Link>
          </h1>
          {isUserPage && userId && (
            <>
              {/* Desktop menu */}
              <nav className="hidden md:flex md:space-x-2">
                <MenuItems />
              </nav>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white dark:bg-gray-900">
                  <nav className="flex flex-col space-y-2 mt-6">
                    <MenuItems />
                  </nav>
                </SheetContent>
              </Sheet>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
