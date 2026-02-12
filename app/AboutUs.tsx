/* eslint-disable react/jsx-no-comment-textnodes */

import React from "react";
import PageWrapper from "@/src/components/PageWrapper";
import SectionInner from "@/src/components/SectionInner";
import { NextPage } from "next";
import Link from "next/link";

const AboutUs: NextPage = () => {
  return (
    <PageWrapper id={"aboutus"}>
      <SectionInner>
        <h2 className={"special-h"}>//ABOUT</h2>

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
            Systems is your AI-powered web and software solutions partner. We
            help your business reach market faster, streamline operations, and
            drive down costs through tailored, AI-driven integrations,
            web, and software solutions.
          </p>
          <p>
            For Arcron Information Systems, technology is the medium for solving
            current and future challenges by combining logic and art, people and
            technology. Arcron: Begin boundlessly.
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
