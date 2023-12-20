import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";

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
    <ClerkProvider>
      <html lang="en">
        <body className="flex flex-col h-screen">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
