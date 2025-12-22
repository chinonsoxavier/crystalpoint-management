import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/provider";
import BackToTop from "@/components/shared/back-to-top";
import WhatsAppFloat from "@/components/shared/whatsapp-float";

const archivoSans = Archivo({
  variable: "--font-archivo-sans",
  subsets: ["latin"],
});

const archivoMono = Archivo({
  variable: "--font-archivo-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "CristalPoint - Investment Management",
  description: "Professional investment management services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${archivoSans.variable} ${archivoMono.variable} antialiased`}
      >
        <WhatsAppFloat />
        <Providers>{children}</Providers>
        <BackToTop />
      </body>
    </html>
  );
}
