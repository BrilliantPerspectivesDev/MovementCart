import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Brilliant Movement",
  description: "Complete your purchase and join the Brilliant Movement",
};

export default function CheckoutLayout({
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