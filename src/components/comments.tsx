import React, { useState } from "react";
import { getUserPostComments } from "@/api/api";
import { Comment, Post } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ErrorMessage from "./error";

const Comments: React.FC<{ post: Post }> = ({ post }) => {
  const [loadingComments, setLoadingComments] = useState<
    Record<number, boolean>
  >({});
  const [commentsMap, setCommentsMap] = useState<Record<number, Comment[]>>({});
  const [isOpen, setIsOpen] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const handleLoadComments = async (postId: number) => {
    if (commentsMap[postId]) return;
    setLoadingComments((prev) => ({ ...prev, [postId]: true }));
    setIsOpen((prev) => ({ ...prev, [postId]: !isOpen }));
    try {
      const comments = await getUserPostComments(postId);
      setCommentsMap((prev) => ({ ...prev, [postId]: comments }));
    } catch (error) {
      console.error("Failed to load comments:", error);
      setError("Failed to load comments. Please try again later.");
    } finally {
      setLoadingComments((prev) => ({ ...prev, [postId]: false }));
    }

    setIsOpen((prev) => ({ ...prev, [postId]: true }));
  };

  if (error) {
    return <ErrorMessage message={error} />;
  }
  return (
    <div>
      <Collapsible
        open={isOpen[post.id]}
        onOpenChange={(open) =>
          setIsOpen((prev) => ({ ...prev, [post.id]: open }))
        }
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            onClick={() => handleLoadComments(post.id)}
            disabled={loadingComments[post.id]}
          >
            {loadingComments[post.id]
              ? "Loading..."
              : isOpen[post.id]
              ? "Hide Comments"
              : "Show Comments"}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-4 space-y-2">
            {commentsMap[post.id]?.map((comment) => (
              <Card key={comment.id} className="bg-gray-50 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {comment.name}
                  </CardTitle>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {comment.email}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {comment.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Comments;
