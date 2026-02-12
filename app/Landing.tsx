import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "@/src/components/PageWrapper";
import { NextPage } from "next";
import { useIntersectionObserver } from "@/src/hooks";
import animation from "@/public/logoanimation.json";
import Stars from "@/src/components/Stars";
import Button from "@/src/components/Button";
import Link from "next/link";
import ClientLottie from "@/src/components/ClientLottie";

const Landing: NextPage = () => {
  const triggerRef = useRef();
  const dataRef = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: false,
  });
  const display = Boolean(dataRef?.isIntersecting);
  const [displayAll, setDisplayAll] = useState(false);
  const [hideAll, setHideAll] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (display) {
      setDisplayAll(true);
      setHideAll(false);
      // @ts-ignore
      clearTimeout(timeoutRef.current);
    } else {
      setDisplayAll(false);
      // @ts-ignore
      timeoutRef.current = setTimeout(() => setHideAll(true), 1000);
    }
  }, [display]);

  // @ts-ignore
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <>
      <PageWrapper id={"landing"}>
        {!hideAll ? (
          <div
            className={[
              displayAll ? "fadein" : "fadeout",
              "relative z-[1] flex w-full flex-col gap-6 p-4 lg:flex-row lg:items-center lg:justify-between lg:p-8",
            ].join(" ")}
          >
            <div className="w-full lg:w-1/2">
              <h3
                style={{
                  WebkitTextStroke: "1px var(--primarylight)",
                }}
                className="mb-8 text-5xl tracking-wide text-uppercase font-['MixCase'] text-transparent sm:text-6xl"
              >
                {"//Merge your vision with code"}
              </h3>
              <p className="mb-4 max-w-xl text-sm">
                Contact us to schedule a free consultation to hear how Arcron
                can help supercharge your business to reach market faster,
                streamline operations, and drive down costs with tailored,
                AI-driven integrations, web, and software solutions.
              </p>
              <Link href="#contactus" passHref>
                <Button text="Contact Us" />
              </Link>
              <Stars />
            </div>

            <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
              <div className="w-[72vw] max-w-[560px] lg:w-[36vw]">
                <ClientLottie
                  animationData={animation}
                  loop={false}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* @ts-ignore */}
        <div ref={triggerRef} />
      </PageWrapper>
    </>
  );
};

export default Landing;
