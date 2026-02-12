import React from "react";

const Text = ({
  children,
  error = false,
  className = "",
}: {
  className?: string;
  children: React.ReactNode;
  error?: boolean;
}) => {
  return (
    <p
      className={`${className ? className : ""}${
        error ? " error-text" : " success-text"
      }`}
    >
      {children}
    </p>
  );
};

export default Text;
