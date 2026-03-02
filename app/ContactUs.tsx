/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import PageWrapper from "../src/components/PageWrapper";
import ContactForm from "../src/components/ContactForm";
import SectionInner from "../src/components/SectionInner";
import { NextPage } from "next";
import OutlineText from "@/src/components/OutlineText";

const ContactUs: NextPage = () => {
  return (
    <PageWrapper id={"contactus"}>
      <SectionInner>
        <OutlineText text="CONTACT" />
        <ContactForm />
      </SectionInner>
    </PageWrapper>
  );
};

export default ContactUs;
