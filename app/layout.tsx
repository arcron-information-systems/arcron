import "@/public/styles/globals.css";
import { Metadata, Viewport } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Arcron Information Systems",
    template: "Arcron Information Systems | AI, web, software",
  },
  description:
    "Arcron Information Systems is your AI, web, and software partner. We help businesses reach market faster, streamline operations, and reduce costs through tailored, AI-driven integrations and custom web and software solutions.",
  metadataBase: new URL("https://www.arcron.systems"),
  icons: {
    icon: "/icon.ico",
  },
  openGraph: {
    title: "Arcron Information Systems",
    description:
      "Arcron Information Systems is your AI, web, and software partner. We help businesses reach market faster, streamline operations, and reduce costs through tailored, AI-driven integrations and custom web and software solutions.",
    url: "https://www.arcron.systems",
    siteName: "Arcron Information Systems",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          id="sa-dynamic-optimization"
          strategy="afterInteractive"
          data-uuid="c282789f-0a74-49d6-a2ed-02252f5d62a8"
          src="https://dashboard.searchatlas.com/scripts/dynamic_optimization.js"
        />
      </body>
    </html>
  );
}
