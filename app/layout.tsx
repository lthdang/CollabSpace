import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CollabSpace - Video Conferencing Platform",
    description: "Internal video conferencing application for seamless collaboration",
    keywords: ["video conferencing", "collaboration", "meetings", "LiveKit"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeRegistry>
                    <ErrorBoundary>
                        <Navbar />
                        <main>{children}</main>
                    </ErrorBoundary>
                </ThemeRegistry>
            </body>
        </html>
    );
}
