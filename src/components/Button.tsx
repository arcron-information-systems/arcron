import React from "react";
import ArcheSymbol from "./ArcronSymbol";

const Button = ({
  text,
  type = "button",
  onClick,
  isLoading,
}: {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  isLoading?: boolean;
}) => {
  return (
    <button
      type={type}
      className="flex cursor-pointer items-center"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading && (
        <div className="animate-[rotatingAni_3s_linear_infinite]">
          <ArcheSymbol rotating />
        </div>
      )}
      <span className={isLoading ? "ml-2" : ""}>{text}</span>
    </button>
  );
};

export default Button;
