/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";

const ProcessList = [
  {
    title: "Discovery",
    description:
      "Let's start with a discovery call to understand your business and your needs. A quick, zero-pressure conversation will determine if Arcron is the right fit for you or if we can point you in the right direction. We're here to be helpful, not pushy.",
  },
  {
    title: "Design & Plan",
    description:
      "We then move on to the design phase to create the game plan. We'll talk about the scope and what it means for the project to be considered complete, the timeline, budget, risks, communication channels, project management tools, and the expectations for each party.",
  },
  {
    title: "Development & Feedback Loop",
    description:
      "This is where Arcron shines. Throughout this phase, we'll be in constant communication and collaboration via regular check-ins to demo progress and touch base on timelines and budgets. This is to ensure we're always on the same page and that the project is progressing as expected.",
  },
  {
    title: "Knowledge Transfer, Launch, & Maintenance",
    description:
      "When everyone is confident the product is ready for prime time, we'll regroup to determine next steps; whether that's performing knowledge transfers to ensure your team is confident maintaining the product, or what it means for Arcron to handle that for you.",
  },
];

const Process: NextPage = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Find the scrolling ancestor (<main> with overflow-y: auto).
    const scrollParent = section.closest("main") as HTMLElement | null;
    if (!scrollParent) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const mainRect = scrollParent.getBoundingClientRect();

      // How far the top of our section has scrolled past the top of <main>.
      const scrolled = mainRect.top - rect.top;
      // Total scrollable distance within this section (section height minus one viewport).
      const sectionHeight = section.offsetHeight;
      const viewportHeight = scrollParent.clientHeight;
      const scrollable = sectionHeight - viewportHeight;

      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      const idx = Math.min(
        ProcessList.length - 1,
        Math.floor(progress * ProcessList.length),
      );
      setActiveIndex(idx);
    };

    scrollParent.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => scrollParent.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full !bg-[var(--darkwhite)]"
      // Make it tall: one viewport for the sticky content + extra viewports for scrolling through cards.
      style={{ height: `${100 + ProcessList.length * 40}vh` }}
    >
      {/* Sticky container: pins to the top while user scrolls through the tall section */}
      <div className="sticky top-0 flex min-h-screen w-full items-center justify-center py-6 sm:py-0">
        <div className="mx-4 flex w-full max-w-[94%] flex-col sm:mx-12 sm:max-w-[75%]">
          <h2 className="special-h mb-3 sm:mb-4">//THE PROCESS</h2>
          <p className="mb-5 text-sm text-[var(--primarydark)] sm:mb-8 sm:text-base">
            Getting a project from idea to launch can be overwhelming. We
            believe in a highly-communicative, transparent, and collaborative
            approach to project development and follow SDLC (Software
            Development Life Cycle) best practices to guide you every step of
            the way.
          </p>

          {/* Cards */}
          <div className="flex w-full gap-3 sm:gap-4">
            {/* Step indicators */}
            <div className="hidden flex-col items-center gap-0 sm:flex">
              {ProcessList.map((_, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <div
                      className="w-0.5 transition-colors duration-300"
                      style={{
                        height: "2rem",
                        backgroundColor:
                          i <= activeIndex
                            ? "var(--primarydark)"
                            : "var(--silver)",
                      }}
                    />
                  )}
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300"
                    style={{
                      backgroundColor:
                        i <= activeIndex ? "var(--primarydark)" : "transparent",
                      color:
                        i <= activeIndex
                          ? "var(--darkwhite)"
                          : "var(--primarydark)",
                      border:
                        i <= activeIndex
                          ? "2px solid var(--primarydark)"
                          : "2px solid var(--silver)",
                    }}
                  >
                    {i + 1}
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Animated card stack */}
            <div
              className="relative flex-1"
              style={{
                minHeight: "clamp(360px, 50vh, 400px)",
              }}
            >
              {ProcessList.map((item, i) => (
                <div
                  key={item.title}
                  className="absolute inset-0 overflow-y-auto rounded-xl bg-[var(--primarydark)] p-6 text-[var(--darkwhite)] transition-all duration-500 sm:rounded-2xl sm:p-8 lg:p-6"
                  style={{
                    opacity: i === activeIndex ? 1 : 0,
                    transform:
                      i === activeIndex
                        ? "translateY(0)"
                        : i < activeIndex
                          ? "translateY(-20px)"
                          : "translateY(20px)",
                    pointerEvents: i === activeIndex ? "auto" : "none",
                  }}
                >
                  <h3 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl lg:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Process };
