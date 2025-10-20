import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CopilotKit } from "@copilotkit/react-core";
import "./globals.css";
import "@copilotkit/react-ui/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Educational Guide Agent",
  description: "AI-powered educational guide for learning any topic with free resources and YouTube videos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CopilotKit 
          runtimeUrl="/api/copilotkit" 
          agent="educationalAgent"
          publicLicenseKey="ck_pub_568d4b6ddab612b409c2bf1d7f6677c8"
        >
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
