import React from "react";
import { useParams } from "react-router-dom";
import { useUsers } from "@/context/userContext";
import Loader from "@/components/loader";
import NoUserFound from "@/components/noUserFound";
import ErrorMessage from "./error";

interface WithUserValidationProps {
  children: React.ReactNode;
}

const WithUserValidation: React.FC<WithUserValidationProps> = ({
  children,
}) => {
  const { users, loading, error } = useUsers();
  const { userId } = useParams<{ userId: string }>();

  const userExists = users.some((user) => user.id === Number(userId));

  if (loading) {
    return <Loader message={"Loading..."} size={"lg"} />;
  }

  if (!userExists) {
    return <NoUserFound />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return <>{children}</>;
};

export default WithUserValidation;
