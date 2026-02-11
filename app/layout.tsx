import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import CreateMeetingButton from "@/components/meeting/CreateMeetingButton";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CollabSpace - Video Conferencing Platform",
  description:
    "Internal video conferencing application for seamless collaboration",
  keywords: ["video conferencing", "collaboration", "meetings", "LiveKit"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          <ThemeRegistry>
            <ErrorBoundary>
              <Navbar />
              <main>{children}</main>
              <CreateMeetingButton />
            </ErrorBoundary>
          </ThemeRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
