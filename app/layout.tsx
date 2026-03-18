import React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Teja Potu | AI/ML PhD Researcher",
  description:
    "PhD researcher at Florida State University specializing in Agentic AI, LLMs, and computational biology. Published in Analytical Chemistry and MDPI Mathematics.",
  keywords: [
    "AI/ML",
    "PhD researcher",
    "Agentic AI",
    "LLM",
    "computational biology",
    "mass spectrometry",
    "graph neural networks",
    "machine learning",
  ],
  authors: [{ name: "Teja Potu" }],
  openGraph: {
    title: "Teja Potu | AI/ML PhD Researcher",
    description:
      "PhD researcher building AI systems that reason, act, and publish. Published in Analytical Chemistry and MDPI Mathematics.",
    type: "website",
    siteName: "Teja Potu",
  },
  twitter: {
    card: "summary",
    title: "Teja Potu | AI/ML PhD Researcher",
    description:
      "PhD researcher building AI systems that reason, act, and publish.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
