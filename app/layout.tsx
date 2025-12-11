import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
//import GlobalLoader from "@/components/animation/loader/global_loader";
import { Providers } from "@/providers/provider";
import BackToTop from "@/components/shared/back-to-top";
import WhatsAppFloat from "@/components/shared/whatsapp-float";
import { AuthGuard } from "@/components/auth_guard";
const archivoSans = Archivo({
  variable: "--font-archivo-sans",
  subsets: ["latin"],
});

const archivoMono = Archivo({
  variable: "--font-archivo-mono",
  subsets: ["latin"],
  weight: ["400", "700"], // Optional weight specification
});

export const metadata: Metadata = {
  title: "CristalPoint - Investment Management",
  description: "Professional investment management services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const { setIsLoading } = useLoading();

  // useEffect(() => {
  //   setIsLoading(true);
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 500); // Adjust timeout as needed

  //   return () => clearTimeout(timer);
  // }, [pathname, searchParams]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivoSans.variable} ${archivoMono.variable} antialiased`}
      >
         {/* WhatsApp float */}
      <WhatsAppFloat/>
        {/* <LoadingProvider> */}
        {/* <AuthGuard> */}
        <Providers>{children}</Providers>
        {/* </AuthGuard> */}
        {/* <GlobalLoader /> */}
        {/* </LoadingProvider> */}
        <BackToTop />
      </body>
    </html>
  );
}
