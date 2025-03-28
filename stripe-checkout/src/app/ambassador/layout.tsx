import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ambassador Program - Brilliant Movement",
  description: "Learn about becoming an ambassador for the Brilliant Movement",
};

export default function AmbassadorLayout({
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