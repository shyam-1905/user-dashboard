import React, { useState, useEffect } from "react";
import { getUserPosts } from "@/api/api";
import { Post } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useParams } from "react-router-dom";
import Comments from "@/components/comments";

const Posts: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing");
      setLoadingPosts(false);
      return;
    }
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const fetchedPosts = await getUserPosts(parseInt(userId));
        setPosts(fetchedPosts);
        setError(null);
      } catch (error) {
        console.error("Failed to load posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  if (loadingPosts) {
    return (
      <div className="space-y-6">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="w-full h-40" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{post.body}</p>
            <Comments post={post} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
