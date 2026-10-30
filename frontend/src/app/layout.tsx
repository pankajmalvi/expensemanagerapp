import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "ExpenseFlow | Personal Expense & Budget Manager",
    template: "%s | ExpenseFlow",
  },
  description:
    "Organize personal finances, categorize expenses, track spending limits, and inspect instant budget summaries with relational SQLite integrity.",
  applicationName: "ExpenseFlow",
  authors: [{ name: "ExpenseFlow Team" }],
  keywords: [
    "expense manager",
    "personal finance",
    "budget tracker",
    "category management",
    "fastapi",
    "nextjs",
    "sqlite",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  openGraph: {
    title: "ExpenseFlow — Fast & Organized Personal Expense Manager",
    description:
      "Effortlessly track expenses, manage budgets by category, and visualize your financial health with instant summaries.",
    url: "http://localhost:3000",
    siteName: "ExpenseFlow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExpenseFlow — Fast & Organized Personal Expense Manager",
    description:
      "Effortlessly track expenses, manage budgets by category, and visualize your financial health.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased bg-[#FAF9F6] text-black font-sans">
        {children}
      </body>
    </html>
  );
}
