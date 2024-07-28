import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User } from "@/types/types";
import { getUser } from "@/api/api";
import UserProfile from "@/components/userProfile";
import UserActivities from "@/components/userActivities";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        const userData = await getUser(parseInt(userId));
        setUser(userData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="w-full h-40" />
        ))}
      </div>
    );
  }

  if (!user) {
    return <div className="text-center text-lg">User not found.</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          User Profile
        </h2>
        <UserProfile user={user} />
      </section>
      <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          User Activities
        </h2>
        <UserActivities userId={user.id} />
      </section>
    </div>
  );
};

export default Dashboard;
