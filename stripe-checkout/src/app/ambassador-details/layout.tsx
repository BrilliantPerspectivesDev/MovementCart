import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ambassador Details - Brilliant Movement",
  description: "Detailed information about the Brilliant Movement ambassador program",
};

export default function AmbassadorDetailsLayout({
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