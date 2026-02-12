import React, { useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import advocatemockup from "@/public/images/advocatemockup.png";
import advocatepuzzle from "@/public/images/advocatepuzzle.png";
import prevent22logo from "@/public/images/prevent22.png";
import prevent22mockup from "@/public/images/prevent22mockup.png";
import nevermanlogo from "@/public/images/neverman.png";
import nevermanmockup from "@/public/images/nevermanmockup.png";
import cctlogo from "@/public/images/CCT-logo-symbol-3d.png";
import cctmockup from "@/public/images/cctmockup.png";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import styles from "./styles.module.css";

const clients = [
  {
    logo: advocatepuzzle,
    description: `Advocate IEP is the modern standard for monitoring student progress towards goals and IEPs.
    Advocate IEP meets teachers where they're at so it's not just another
    tool they're forced to use, it's an extension of how they're already working. With a modern technology stack,
    natural user experience, and simply useful features, Advocate IEP is one of Arcron's proudest proof of concepts.`,
    mockup: advocatemockup,
  },
  {
    logo: prevent22logo,
    description: `Prevent 22 is a non-profit based out of Illinois that uplifts veterans across the country.
    It's been an honor to volunteer our services and we've seen incredible results from our efforts.
    Through our partnership, we dramatically improved their previous website, cut technology costs, and implemented a new donation process to give their organization
    the credibility and simplicity it needed to bring in substantially more donations coming in with higher margins to drive their mission forward.
    `,
    mockup: prevent22mockup,
  },
  {
    logo: nevermanlogo,
    description: `Neverman Enterprises has an intricate web architecture with a custom landing page, an advanced e-commerce platform, and two static business websites built on WordPress.
    The goal was to have a consistent yet differentiated UI with seamless transitions between all four sites 
    and we were able to accomplish exactly that without sacrificing simplicity. Neverman operates out of Small-Town, USA but their advanced online presence allows them to stay relevant and compete on a much larger scale.
    `,
    mockup: nevermanmockup,
  },
  {
    logo: cctlogo,
    description: `CCT is our latest project and will be our biggest one yet. Currently in the early stages of development, this web application 
    will soon be the gold standard for the construction industry. This web-based, cloud-native software will merge advanced functionality with simplicity while showcasing a modern UI/UX that is currently
    missing from an industry that is outdated and ripe for disruption. Stay tuned.
    `,
    mockup: cctmockup,
  },
];

interface PageProps {
  offset: number;
  onClick: () => void;
}

const Page = ({ offset, onClick }: PageProps) => (
  <>
    <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
      <div className={styles.slopeBegin} />
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
      <div
        style={{
          background: "var(--primary)",
        }}
        className={`${styles.slopeEnd}`}
      />
    </ParallaxLayer>

    <ParallaxLayer
      className={`${styles.text} ${styles.number} ${styles.contentWrapper}`}
      offset={offset}
      speed={0.3}
    >
      <div className={"portfolio-wrapper"}>
        <div className={"portfolio-logo "}>
          <Image src={clients[offset].logo} alt={"client logo"} />
        </div>
        <div className={"portfolio-description"}>
          <p className={"mb-4"}>{clients[offset].description}</p>
          <div className="mb-8 flex justify-center sm:hidden">
            <Image
              src={clients[offset].logo}
              alt={"client logo"}
              className="h-auto max-w-[200px]"
            />
          </div>
          <p>
            Side scroll or click to see more{" "}
            {offset === clients.length - 1 ? (
              <span>&#128072;</span>
            ) : offset === 0 ? (
              <span>&#128073;</span>
            ) : (
              <span>&#128072; &#128073; </span>
            )}
          </p>
        </div>
        <div className={"mockup"}>
          <Image src={clients[offset].mockup} alt={"client mockup"} />
        </div>
      </div>
    </ParallaxLayer>
  </>
);

export const Portfolio: NextPage = () => {
  const parallax = useRef<IParallax>(null);

  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
    }
  };

  return (
    <section id={"portfolio"} className={"portfolio-bg"}>
      <Parallax
        className={styles.container}
        ref={parallax}
        pages={4}
        horizontal
      >
        {clients.map((client, index) => (
          <Page key={index} offset={index} onClick={() => scroll(index + 1)} />
        ))}
      </Parallax>
    </section>
  );
};
