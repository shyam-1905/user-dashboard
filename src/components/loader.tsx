// src/components/LoadingSpinner.tsx
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

const Loader: React.FC<LoadingProps> = ({
  size = "md",
  message = "Loading...",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Loader2
        className={`${sizeClasses[size]} animate-spin text-primary mb-2`}
      />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default Loader;
