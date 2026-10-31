import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExpenseFlow | Personal Expense Manager",
  description: "Track your expenses, organize spending by category, and manage your personal budget effortlessly.",
  applicationName: "ExpenseFlow",
  keywords: ["expense manager", "budget tracker", "personal finance", "spending tracker", "category manager"],
  authors: [{ name: "ExpenseFlow" }],
  openGraph: {
    title: "ExpenseFlow | Personal Expense Manager",
    description: "Track your expenses, organize spending by category, and manage your personal budget effortlessly.",
    siteName: "ExpenseFlow",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "ExpenseFlow | Personal Expense Manager",
    description: "Track your expenses, organize spending by category, and manage your personal budget effortlessly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#FAF9F6] text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
