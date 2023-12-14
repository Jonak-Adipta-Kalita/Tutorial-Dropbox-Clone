import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAK Dropbox Clone",
  description: "From Sonny Sangha's Video",
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
