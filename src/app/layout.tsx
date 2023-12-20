import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Disclaimer from "@/components/Disclaimer";

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
        <body className="">
          <Header />
          {children}
          <Disclaimer />
        </body>
      </html>
    </ClerkProvider>
  );
}
