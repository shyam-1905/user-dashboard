// src/components/UserActivities.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle } from "./ui/card";

interface UserActivitiesProps {
  userId: number;
}

const UserActivities: React.FC<UserActivitiesProps> = ({ userId }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to={`/users/${userId}/posts`} className="w-full">
          <Card className="h-48 flex flex-col justify-center transition-transform transform hover:scale-105 dark:bg-gray-900">
            <CardContent className="flex flex-col items-center p-4">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">
                Posts
              </CardTitle>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                View all posts by the user.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link to={`/users/${userId}/todos`} className="w-full">
          <Card className="h-48 flex flex-col justify-center transition-transform transform hover:scale-105 dark:bg-gray-900">
            <CardContent className="flex flex-col items-center p-4">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">
                Todos
              </CardTitle>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                View all todos assigned to the user.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link to={`/users/${userId}/photos`} className="w-full">
          <Card className="h-48 flex flex-col justify-center transition-transform transform hover:scale-105 dark:bg-gray-900">
            <CardContent className="flex flex-col items-center p-4">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">
                Photos
              </CardTitle>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                View all photos uploaded by the user.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default UserActivities;
