import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { NavProvider } from "@/lib/NavContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Querion - AI Data Analyst",
  description: "Natural Language to SQL AI Data Analyst",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} antialiased h-screen flex overflow-hidden bg-app-bg text-text-main font-sans`}
      >
        <NavProvider>
          <Sidebar />
          <main className="flex-1 flex flex-col min-w-0 shrink overflow-hidden">
            <Topbar />
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5">
              {children}
            </div>
          </main>
        </NavProvider>
      </body>
    </html>
  );
}
