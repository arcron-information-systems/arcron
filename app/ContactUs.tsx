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
        <p className="mb-8 text-sm">
          Once you submit the form, we&apos;ll get back to you within 24 hours. We offer
          a free, 30-minute discovery call to see if Arcron would be a good fit
          for your project or if we can point you in the right direction.
          We&apos;re here to be helpful, not pushy.
        </p>
        <ContactForm />
      </SectionInner>
    </PageWrapper>
  );
};

export default ContactUs;
