import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Culinary Architect | Table 12",
  description: "Experience Excellence at Culinary Architect. A fusion of architectural precision and sensory warmth.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-on-surface">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

