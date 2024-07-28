import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Todo } from "@/types/types";
import { getUserTodos } from "@/api/api";
import { Check, X, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Todos = () => {
  const { userId } = useParams<{ userId: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        const userTodos = await getUserTodos(parseInt(userId));
        setTodos(userTodos);
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
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          User Todos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-4">
            {todos.map((todo) => (
              <Card
                key={todo.id}
                className="overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <p className="font-medium flex-1 mr-4">{todo.title}</p>
                  <Badge variant={todo.completed ? "success" : "destructive"}>
                    {todo.completed ? (
                      <Check className="h-4 w-4 mr-1" />
                    ) : (
                      <X className="h-4 w-4 mr-1" />
                    )}
                    {todo.completed ? "Completed" : "Pending"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Todos;
