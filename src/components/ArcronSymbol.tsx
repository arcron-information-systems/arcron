import React from "react";
import Image from "next/image";
import Symbol from "@/public/images/arcronsymbolwhite.png";
import SymbolGreen from "@/public/images/arcronsymbolgreen.png";
import SymbolBlack from "@/public/images/arcronsymbolblack.png";

const ArcronSymbol = ({
  rotating,
  color,
}: {
  rotating?: boolean;
  color?: "white" | "green" | "black"; // default is white
}) => {
  const symbol =
    color === "black" ? SymbolBlack : color === "green" ? SymbolGreen : Symbol;
  return (
    <Image
      src={symbol}
      alt="Arcron Information Systems"
      style={
        rotating
          ? { width: "20px", height: "auto" }
          : { width: "100%", height: "auto" }
      }
    />
  );
};

export default ArcronSymbol;
