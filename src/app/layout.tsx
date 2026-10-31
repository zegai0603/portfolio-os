import type { Metadata } from "next";
import { JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jetbrains",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["200", "300"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Zhe Khai Tew",
  description: "Zhe Khai Tew's work, projects and writing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${sora.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
