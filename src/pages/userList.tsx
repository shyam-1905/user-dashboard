import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "@/api/api";
import { User } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Mail, Phone } from "lucide-react";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
        setError(null);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <Card className="mt-4">
        <CardContent className="pt-6">
          <p className="text-center text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">User Directory</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))
          : users.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <Link
                      to={`/users/${user.id}`}
                      className="text-xl hover:text-primary transition-colors"
                    >
                      {user.name}
                    </Link>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => navigate(`/users/${user.id}`)}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center text-sm text-muted-foreground mb-2">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </p>
                  <p className="flex items-center text-sm text-muted-foreground mb-4">
                    <Phone className="h-4 w-4 mr-2" />
                    {user.phone}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/users/${user.id}/posts`)}
                    >
                      Posts
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/users/${user.id}/todos`)}
                    >
                      Todos
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/users/${user.id}/photos`)}
                    >
                      Photos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default UserList;
