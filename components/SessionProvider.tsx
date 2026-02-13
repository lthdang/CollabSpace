"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

/**
 * Client component wrapper for NextAuth SessionProvider
 * This allows us to use useSession hook in client components
 */
export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
