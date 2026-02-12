import React from "react";

const SectionInner = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={`section-inner${className && ` ${className}`}`}>
      {children}
    </section>
  );
};

export default SectionInner;
