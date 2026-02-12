import React from "react";

const PageWrapper = ({
  children,
  id = "",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}) => {
  return (
    <section
      id={id}
      className={`page-wrapper${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      {children}
    </section>
  );
};

export default PageWrapper;
