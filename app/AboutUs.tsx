/* eslint-disable react/jsx-no-comment-textnodes */

import React from "react";
import PageWrapper from "@/src/components/PageWrapper";
import SectionInner from "@/src/components/SectionInner";
import { NextPage } from "next";
import Link from "next/link";
import OutlineText from "@/src/components/OutlineText";

const AboutUs: NextPage = () => {
  return (
    <PageWrapper id={"aboutus"}>
      <SectionInner>
        <OutlineText text="ABOUT" />

        <section className={"flex flex-col gap-6"}>
          <p>
            <span className="font-bold">Arcron</span> is a portmanteau of two
            ancient Greek words:
          </p>
          <div className={"flex flex-col gap-2"}>
            <p>
              <span className="font-bold">
                <u>Arc</u>he:{" "}
              </span>
              (ar·​che ˈärˌkē;) <i>A beginning; an actuating principle</i>
            </p>
            <p>
              <span className="font-bold">
                Apei<u>ron</u>:{" "}
              </span>
              (apei·​ron əˈpīˌrän){" "}
              <i>That which is unlimited, boundless, infinite, or indefinite</i>
            </p>
            <p>
              <span className="font-bold">Information Systems:</span> the
              intersection of tasks, people, structures, and technology.
            </p>
          </div>
          <p>
            Proudly headquartered in Denver, Colorado, Arcron Information
            Systems specializes in taking AI-built prototypes and vibe-coded
            MVPs to production. Whether you used Cursor, Bolt, Replit, or had
            someone build a proof of concept, we turn it into software that
            scales, performs, and is built to last.
          </p>
          <p>
            We&apos;re also a full-service development partner for businesses
            that need custom web applications, AI integrations, and mobile apps
            from the ground up. Technology is the medium for solving current and
            future challenges by combining logic and art, people and technology.
            Arcron: Begin boundlessly.
          </p>
          <p>
            <Link href={"#contactus"}>
              Let&apos;s talk about your vision. &#8594;
            </Link>
          </p>
        </section>
      </SectionInner>

      <div className="contact-bg" />
    </PageWrapper>
  );
};

export default AboutUs;
