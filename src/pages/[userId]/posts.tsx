import React, { useState, useEffect } from "react";
import { getUserPosts } from "@/api/api";
import { Post } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import Comments from "@/components/comments";
import ErrorMessage from "@/components/error";
import Loader from "@/components/loader";

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
    return <Loader message={"Loading Posts ....."} size="lg" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
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
