import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  keywords: [
    "Solution Architect",
    "Full-Stack Engineer",
    "Node.js",
    "React",
    "System Design",
    "Technical Founder",
    "Mustafa Ahmed",
  ],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Arms the scroll-reveal styles before first paint, then un-arms them
            if hydration never happened — content must never stay invisible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");setTimeout(function(){if(!window.__revealReady){document.documentElement.classList.remove("js")}},3000)`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
