/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import PageWrapper from "../src/components/PageWrapper";
import ContactForm from "../src/components/ContactForm";
import SectionInner from "../src/components/SectionInner";
import { NextPage } from "next";

const ContactUs: NextPage = () => {
  return (
    <PageWrapper id={"contactus"}>
      <SectionInner>
        <h2 className={"special-h"}>//CONTACT</h2>
        <ContactForm />
      </SectionInner>
    </PageWrapper>
  );
};

export default ContactUs;
