import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Murflix",
  description: "Sign in to your Murflix account",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
