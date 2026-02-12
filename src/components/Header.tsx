import React from "react";
import ArcronLogo from "./ArcronLogo";
import Link from "next/link";

const Header = ({
  isModalHeader = false,
  toggleModal,
  activeHash = "",
}: {
  isModalHeader?: boolean;
  toggleModal: () => void;
  activeHash?: string;
}) => {
  const isDark = ["process", "services"].includes(activeHash) && !isModalHeader;
  const textColor = isDark ? "var(--primarydark)" : "var(--darkwhite)";

  return (
    <header
      className={[
        "sticky top-0 z-[3] h-[5.7vh] w-full transition-colors duration-500",
        isModalHeader
          ? "backdrop-blur-none backdrop-saturate-100"
          : "backdrop-blur-xl backdrop-saturate-150",
      ].join(" ")}
      style={{ color: textColor }}
    >
      <nav className="flex items-center justify-between px-4 py-1 h-full">
        <div>
          {isModalHeader ? (
            <span className="cursor-default opacity-0 hidden sm:inline">
              Free Consultation &#8594;
            </span>
          ) : (
            <Link
              className="hidden transition-colors duration-500 sm:inline"
              style={{ color: textColor }}
              href={"#contactus"}
            >
              Free Consultation &#8594;
            </Link>
          )}
        </div>
        <Link href={"/"} passHref>
          <ArcronLogo
            height={"38px"}
            width={"auto"}
            color={isDark ? "primary" : "white"}
          />
        </Link>
        <div
          onClick={toggleModal}
          className="flex cursor-pointer justify-center"
        >
          {isModalHeader ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="h-8 w-8 transition-colors duration-500 sm:h-12 sm:w-12"
              viewBox="0 0 16 16"
              style={{ fill: textColor }}
            >
              <path
                fillRule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              />
              <path
                fillRule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="h-8 w-8 transition-colors duration-500 sm:h-12 sm:w-12"
              viewBox="0 0 16 16"
              style={{ fill: textColor }}
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
