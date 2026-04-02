import "@/public/styles/globals.css";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Arcron Information Systems | Prototype to Production, Denver",
    template: "%s | Arcron Information Systems",
  },
  description:
    "Denver-based studio that takes AI-built prototypes and vibe-coded MVPs to production. Full-service web, AI & software development.",
  metadataBase: new URL("https://www.arcron.systems"),
  icons: {
    icon: "/icon.ico",
  },
  openGraph: {
    title: "Arcron Information Systems | Prototype to Production, Denver",
    description:
      "Denver-based studio that takes AI-built prototypes and vibe-coded MVPs to production. Full-service web, AI & software development.",
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
      <body>{children}</body>
    </html>
  );
}
