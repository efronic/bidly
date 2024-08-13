"use client";

import "@knocklabs/react/dist/index.css";
import { env } from "@/env";
import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ReactNode } from "react";

export function AppKnockProvider({ children }: { children: ReactNode }) {
  const { user, getUser } = useKindeBrowserClient();

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={user?.id ?? ""}
    >
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
