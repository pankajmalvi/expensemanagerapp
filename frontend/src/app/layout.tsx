import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "ExpenseFlow | Personal Expense & Category Manager",
    template: "%s | ExpenseFlow",
  },
  description:
    "Organize personal finances, categorize expenses, track spending, and inspect instant budget summaries.",
  applicationName: "ExpenseFlow",
  authors: [{ name: "ExpenseFlow Team" }],
  keywords: [
    "expense manager",
    "personal finance",
    "budget tracker",
    "category management",
    "spending log",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "ExpenseFlow — Personal Expense & Category Manager",
    description:
      "Effortlessly track expenses, manage budgets by category, and visualize your financial health with instant summaries.",
    url: "http://localhost:3000",
    siteName: "ExpenseFlow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ExpenseFlow — Personal Expense & Category Manager",
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
    <html lang="en">
      <body className="antialiased bg-[#FAF9F6] text-black">
        {children}
      </body>
    </html>
  );
}
