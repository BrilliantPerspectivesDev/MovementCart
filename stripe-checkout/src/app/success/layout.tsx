import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful - Brilliant Movement",
  description: "Your payment was successful. Welcome to the Brilliant Movement!",
};

export default function SuccessLayout({
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