import React from "react";

interface ErrorMessageProps {
  message: string;
  type?: "error" | "warning" | "info";
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = "error",
}) => {
  const getColorClasses = () => {
    switch (type) {
      case "warning":
        return "bg-yellow-100 border-yellow-500 text-yellow-700";
      case "info":
        return "bg-blue-100 border-blue-500 text-blue-700";
      default:
        return "bg-red-100 border-red-500 text-red-700";
    }
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${getColorClasses()}`} role="alert">
      <p className="font-bold">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
