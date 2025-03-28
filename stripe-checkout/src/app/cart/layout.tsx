import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart - Brilliant Movement",
  description: "Review and manage items in your Brilliant Movement cart",
};

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
} 