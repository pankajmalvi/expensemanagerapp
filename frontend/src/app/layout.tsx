import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExpenseFlow | Neobrutalist Expense Manager",
  description: "A fast, relational expense tracker built with Next.js, FastAPI, and SQLite.",
  openGraph: {
    title: "ExpenseFlow | Neobrutalist Expense Manager",
    description: "Full stack relational expense tracker with category management, foreign key integrity, and instant reactive summaries.",
    type: "website",
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
