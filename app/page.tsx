"use client";
import { useEffect, useRef, useState } from "react";
// import dynamic from "next/dynamic";
import NavModal from "../src/components/NavModal";
import Header from "../src/components/Header";
import ContactUs from "./ContactUs";
import { Footer } from "@/src/components/Footer";
import Landing from "./Landing";
import AboutUs from "./AboutUs";
import { Process } from "./process/Process";
import { Portfolio } from "./Portfolio";
import { Services } from "./Services";

// const Portfolio = dynamic(
//   () => import("./Portfolio").then((m) => m.Portfolio as any),
//   { ssr: false }
// );
// const Services = dynamic(
//   () => import("./Services").then((m) => m.Services as any),
//   {
//     ssr: false,
//   }
// );
// const Landing = dynamic(
//   () => import("./Landing").then((m) => m.default as any),
//   {
//     ssr: false,
//   }
// );
// const AboutUs = dynamic(
//   () => import("./AboutUs").then((m) => m.default as any),
//   {
//     ssr: false,
//   }
// );
// const Process = dynamic(
//   () => import("./process").then((m) => m.Process as any),
//   {
//     ssr: false,
//   }
// );

const LANDING_ID = "landing";

/**
 * Keeps the URL hash in sync with whichever section is currently in view.
 * Also returns the currently active section id so components can react to it.
 */
function useScrollSpy(mainRef: React.RefObject<HTMLElement | null>) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    // --- 1. Handle initial hash on page load / refresh ---
    const rawHash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    const initialHash = rawHash === LANDING_ID ? "" : rawHash;
    let didScrollToHash = !initialHash;
    let userHasScrolled = false;
    let currentId = "";

    if (rawHash === LANDING_ID) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    // --- 2. Find which section contains the center of the viewport ---
    const getSections = () =>
      Array.from(mainEl.querySelectorAll<HTMLElement>("section[id]")).filter(
        (el) => Boolean(el.id),
      );

    const update = () => {
      const mainRect = mainEl.getBoundingClientRect();
      // The "probe" point: 85% down the visible viewport of <main>.
      const probeY = mainRect.top + mainEl.clientHeight * 0.1;

      let bestId = "";
      for (const section of getSections()) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          bestId = section.id;
          // Don't break: later (lower) sections that also contain the probe
          // would be nested; we want the outermost, so first match wins.
          break;
        }
      }

      if (!bestId || bestId === currentId) return;
      currentId = bestId;
      setActiveSection(bestId);

      if (!userHasScrolled) return;
      if (bestId === LANDING_ID) {
        if (window.location.hash) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search,
          );
        }
        return;
      }
      const next = "#" + bestId;
      if (window.location.hash !== next) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search + next,
        );
      }
    };

    const onScroll = () => {
      userHasScrolled = true;
      update();
    };
    mainEl.addEventListener("scroll", onScroll, { passive: true });

    // --- 3. Watch for new sections mounting (dynamic imports) ---
    const mo = new MutationObserver(() => {
      update();
      if (!didScrollToHash && initialHash) {
        const target = document.getElementById(initialHash);
        if (target) {
          didScrollToHash = true;
          target.scrollIntoView({ block: "start" });
        }
      }
    });
    mo.observe(mainEl, { childList: true, subtree: true });

    // Scroll to initial hash if target is already in the DOM.
    if (!didScrollToHash && initialHash) {
      const target = document.getElementById(initialHash);
      if (target) {
        didScrollToHash = true;
        target.scrollIntoView({ block: "start" });
      }
    }

    return () => {
      mo.disconnect();
      mainEl.removeEventListener("scroll", onScroll);
    };
  }, [mainRef]);

  return activeSection;
}

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen((prev) => !prev);
  const mainRef = useRef<HTMLElement | null>(null);

  const activeSection = useScrollSpy(mainRef);

  return (
    <>
      <NavModal open={modalOpen} closeModal={toggleModal} />
      <main ref={mainRef} className={modalOpen ? "no-scroll" : "main"}>
        <Header
          toggleModal={toggleModal}
          isModalHeader={modalOpen}
          activeHash={activeSection}
        />
        <Landing />
        <AboutUs />
        <Services isActive={activeSection === "services"} />
        <Portfolio />
        <Process />
        <ContactUs />
        <Footer />
      </main>
    </>
  );
};

export default Home;
