import React from "react";
import Image from "next/image";
import WhiteLogo from "@/public/images/arcronlogowhite.png";
import BlackLogo from "@/public/images/arcronlogoblack.png";
import PrimaryLogo from "@/public/images/arcronlogogreen.png";

const logos = {
  white: WhiteLogo,
  black: BlackLogo,
  primary: PrimaryLogo,
};

const ArcronLogo = ({
  width = "100%",
  height = "auto",
  color = "white",
}: {
  width?: string;
  height?: string;
  color?: "primary" | "black" | "white";
}) => {
  return (
    <span className="relative inline-block" style={{ width, height }}>
      {(Object.keys(logos) as Array<keyof typeof logos>).map((key) => (
        <Image
          key={key}
          src={logos[key]}
          alt="Arcron Information Systems"
          className="transition-opacity duration-500"
          style={{
            width,
            height,
            position: key === color ? "relative" : "absolute",
            top: 0,
            left: 0,
            opacity: key === color ? 1 : 0,
          }}
        />
      ))}
    </span>
  );
};

export default ArcronLogo;
