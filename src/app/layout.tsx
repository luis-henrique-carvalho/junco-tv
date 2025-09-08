import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { NavigationMenuDemo } from "@/components/layout/navgate-menu";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Junco TV - Portal de Notícias",
  description: "Portal de notícias com cobertura completa dos principais acontecimentos regionais e nacionais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationMenuDemo />
          {children}
        </ThemeProvider>

        <Toaster />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
