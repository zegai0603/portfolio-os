import type { Metadata } from "next";
import { JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const title = "Zhe Khai Tew";
const description = "Computer Science at SMU. Software engineering work and projects, including the experiments that failed.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zhekhai.com"),
  title,
  description,
  openGraph: { title, description, url: "/", type: "website" },
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
