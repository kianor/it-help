import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin | RitsIT",
  robots: { index: false, follow: false },
};

/** Root layout voor het admin-gedeelte. Admin blijft Nederlands. */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <body>{children}</body>
    </html>
  );
}
