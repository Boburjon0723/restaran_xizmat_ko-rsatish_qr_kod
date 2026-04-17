import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export const metadata: Metadata = {
  title: "Kitchen Central | Live Orders",
  description: "Real-time kitchen management and ticket tracking by Culinary Architect."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-surface text-on-surface antialiased">
        <AdminSidebar />
        <main className="md:ml-64 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

