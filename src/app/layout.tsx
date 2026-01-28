import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { VSCodeShell } from "@/components/VSCodeShell";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "zk's portfolio",
  description: "A VS Code-inspired portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono antialiased" suppressHydrationWarning>
        <VSCodeShell>{children}</VSCodeShell>
      </body>
    </html>
  );
}
