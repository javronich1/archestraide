import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "ArchestrAide — AVEVA Application Server & OMI Support Copilot",
  description:
    "Retrieval-based support assistant for AVEVA Application Server and OMI, with cited runbooks, local PDF search and optional Claude synthesis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col md:flex-row">
          <Sidebar />
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
