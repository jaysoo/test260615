import type { ReactNode } from "react";

export const metadata = {
  title: "Turbo Remote Cache Example",
  description: "Next.js app in a Turborepo with shared remote cache",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
