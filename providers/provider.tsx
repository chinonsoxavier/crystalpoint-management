"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { baseAxios } from "@/network/axios";

export function Providers({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        await baseAxios.get("/health");
        console.log("Server is running ");
      } catch (error) {
        console.error("Server health check failed:", error);
      }
    };
    checkServerHealth();
  }, []);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
