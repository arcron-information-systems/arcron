import React from "react";
import PageWrapper from "./PageWrapper";
import Link from "next/link";

const NavModal = ({ open = false, closeModal = () => {} }) => {
  return (
    <section
      className={[
        "fixed inset-0 flex h-screen w-full flex-col bg-[var(--primarydark)]",
        open ? "z-[3] opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <PageWrapper id={"modal"}>
        <div className="flex flex-col items-center justify-between">
          <nav>
            <ul>
              <li>
                <Link href={"#aboutus"} onClick={closeModal}>
                  ABOUT
                </Link>
              </li>
              <li>
                <Link href={"#services"} onClick={closeModal}>
                  SERVICES
                </Link>
              </li>
              <li>
                <Link href={"#portfolio"} onClick={closeModal}>
                  PORTFOLIO
                </Link>
              </li>
              <li>
                <Link href={"#process"} onClick={closeModal}>
                  PROCESS
                </Link>
              </li>
              <li>
                <Link href={"#contactus"} onClick={closeModal}>
                  CONTACT
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </PageWrapper>
    </section>
  );
};

export default NavModal;
