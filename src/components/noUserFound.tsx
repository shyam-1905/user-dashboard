// src/pages/NoUserFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NoUserFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        No User Found
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-8">
        Sorry, the user you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NoUserFound;
