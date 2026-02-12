/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "@/src/components/PageWrapper";
import SectionInner from "@/src/components/SectionInner";
import Lottie from "lottie-react";
import animation from "@/public/logoanimation.json";

const services = [
  {
    label: "AI Integration & Automation",
    icon: "🤖",
    description:
      "Turn repetitive work into automated workflows and embed practical AI where it drives measurable ROI, faster decisions, and smarter day-to-day operations.",
  },
  {
    label: "Proof of Concepts",
    icon: "💡",
    description:
      "Pressure-test your big ideas with focused prototypes that prove value early, reduce risk, and give your team confidence before major investment.",
  },
  {
    label: "Custom Websites",
    icon: "🌐",
    description:
      "Launch modern, high-performance websites built around your brand, your audience, and your goals so visitors turn into qualified leads.",
  },
  {
    label: "eCommerce",
    icon: "🛒",
    description:
      "Build conversion-focused online stores with seamless checkout, reliable integrations, and a frictionless buying experience that increases revenue.",
  },
  {
    label: "WordPress / Wix / Webflow",
    icon: "🔧",
    description:
      "Get flexible CMS builds and strategic upgrades on popular platforms so your team can publish faster, stay consistent, and scale with confidence.",
  },
  {
    label: "Mobile Apps",
    icon: "📱",
    description:
      "Deliver polished iOS and Android experiences designed for speed, usability, and retention so users keep coming back and engaging.",
  },
  {
    label: "Dashboards & APIs",
    icon: "📊",
    description:
      "Unify your data with robust APIs and clear dashboards that surface insights instantly and keep teams aligned around one source of truth.",
  },
  {
    label: "Web Applications",
    icon: "⚡",
    description:
      "Ship scalable web applications tailored to your workflows and users, with architecture built to support growth without bottlenecks.",
  },
];

// Distribute cards evenly around a circle (in degrees).
const angleStep = 360 / services.length;

// Each card gets a slightly different float animation delay so they feel organic.
const floatDelays = services.map((_, i) => `${(i * -0.6).toFixed(1)}s`);

// Total exit animation duration: last card starts at (services.length - 1) * 0.06s,
// plus 0.4s for the animation itself.
const exitDurationMs = ((services.length - 1) * 0.06 + 0.4) * 1000 + 50; // small buffer

type Phase = "hidden" | "entering" | "exiting";

export const Services = ({ isActive = false }: { isActive?: boolean }) => {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [useStackedLayout, setUseStackedLayout] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isActive) {
      // Cancel any pending exit
      if (exitTimer.current) clearTimeout(exitTimer.current);
      setPhase("entering");
    } else if (phase === "entering") {
      // Was visible, now leaving — play exit animation
      setPhase("exiting");
      exitTimer.current = setTimeout(() => setPhase("hidden"), exitDurationMs);
    }
    // "hidden" stays hidden — no action needed
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Use stacked layout through tablet/small desktop.
    const mq = window.matchMedia("(max-width: 1023px)");
    const handleChange = () => setUseStackedLayout(mq.matches);
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isActive || useStackedLayout) setHoveredIndex(null);
  }, [isActive, useStackedLayout]);

  const showContent = phase !== "hidden";
  const hoveredService = hoveredIndex !== null ? services[hoveredIndex] : null;

  return (
    <PageWrapper id="services" className="!bg-[var(--darkwhite)]">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50%      { transform: translate(-50%, -50%) translateY(var(--float-y, -12px)); }
        }
        @keyframes fadeScale {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes fadeScaleOut {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          to   { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
        }
      `}</style>

      <SectionInner>
        <h2 className="special-h">//SERVICES</h2>

        {useStackedLayout ? (
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
            {services.map((svc) => (
              <div
                key={svc.label}
                className="rounded-xl bg-[var(--primary)] p-4 text-[var(--darkwhite)]"
                style={{ boxShadow: "0 0 18px 2px var(--primarylight)" }}
              >
                <div className="mb-1 flex items-center gap-2 text-lg font-bold">
                  <span>{svc.icon}</span>
                  <span>{svc.label}</span>
                </div>
                <p className="text-sm">{svc.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="relative mx-auto w-full"
            style={{ height: "min(80vw, 600px)" }}
          >
            {/* Center area: Lottie by default, hovered service details on card hover */}
            <div
              className="absolute left-1/2 top-1/2 z-10 w-[32%] max-w-[360px] min-w-[260px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
              style={{ opacity: phase === "entering" ? 1 : 0 }}
            >
              {showContent && (
                <div className="relative min-h-[220px] rounded-2xl">
                  <div
                    className={[
                      "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out",
                      hoveredService
                        ? "pointer-events-none opacity-0 scale-95"
                        : "opacity-100 scale-100",
                    ].join(" ")}
                  >
                    <div className="lottie-services h-full w-full">
                      <Lottie
                        animationData={animation}
                        loop={false}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>

                  <div
                    className={[
                      "absolute inset-0 text-[var(--primarydark)] text-center transition-all duration-500 ease-out",
                      hoveredService
                        ? "opacity-100 scale-100 translate-y-0"
                        : "pointer-events-none opacity-0 scale-95 translate-y-1",
                    ].join(" ")}
                    style={
                      {
                        // backgroundColor: "var(--primary)",
                        // boxShadow: "0 0 18px 2px var(--primarylight)",
                      }
                    }
                  >
                    {hoveredService && (
                      <>
                        <h3 className="mb-2 text-lg font-bold text-[var(--primarydark)]">
                          {hoveredService.icon} {hoveredService.label}
                        </h3>
                        <p className="text-sm">{hoveredService.description}</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Orbiting cards (desktop only) */}
            {services.map((svc, i) => {
              const angle = (angleStep * i - 90) * (Math.PI / 180);
              const cx = 50 + Math.cos(angle) * 38;
              const cy = 50 + Math.sin(angle) * 40;

              let anim = "none";
              let opacity: number | undefined = 0;

              if (phase === "entering") {
                anim = `fadeScale 0.5s ease-out ${(i * 0.08).toFixed(
                  2,
                )}s both, float 4s ease-in-out ${floatDelays[i]} infinite`;
                opacity = undefined;
              } else if (phase === "exiting") {
                anim = `fadeScaleOut 0.4s ease-in ${(i * 0.06).toFixed(2)}s both`;
                opacity = undefined;
              }

              return (
                <div
                  key={svc.label}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={
                    {
                      left: `${cx}%`,
                      top: `${cy}%`,
                      "--float-y": `${-10 - (i % 3) * 4}px`,
                      animation: anim,
                      opacity,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="flex flex-col items-center gap-1 rounded-xl px-4 py-3 text-center text-[var(--darkwhite)] transition-shadow duration-300"
                    style={{
                      backgroundColor: "var(--primary)",
                      boxShadow: "0 0 18px 2px var(--primarylight)",
                    }}
                  >
                    <span className="text-2xl">{svc.icon}</span>
                    <span className="whitespace-nowrap text-xs font-semibold leading-tight">
                      {svc.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SectionInner>
    </PageWrapper>
  );
};
