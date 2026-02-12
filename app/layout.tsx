import "@/public/styles/globals.css";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Arcron Information Systems",
  description: "Arcron Information Systems",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

//@ts-ignore
export default function RootLayout({ children }) {
  const isProposalPage = children.props.childProp.segment === "proposals";

  return (
    <html lang="en">
      <body className={isProposalPage ? "is-preload" : ""}>
        {children}
        {isProposalPage ? (
          <>
            <script src="/proposal-assets/js/jquery.min.js" defer></script>
            <script
              src="/proposal-assets/js/jquery.scrollex.min.js"
              defer
            ></script>
            <script
              src="/proposal-assets/js/jquery.scrolly.min.js"
              defer
            ></script>
            <script src="/proposal-assets/js/browser.min.js" defer></script>
            <script src="/proposal-assets/js/breakpoints.min.js" defer></script>
            <script src="/proposal-assets/js/util.js" defer></script>
            <script src="/proposal-assets/js/main.js" defer></script>
          </>
        ) : null}
      </body>
    </html>
  );
}
