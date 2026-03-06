"use client";

import { useEffect } from "react";
import useUserStore from "@/app/user/user_store";
import useAdminStore from "@/app/admin/_admin_store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isInitialized, initializeAuth } = useUserStore();
  const { loadAdmin } = useAdminStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
      loadAdmin();
    }
  }, [isInitialized, initializeAuth, loadAdmin]);

  return <>
  {children}
  </>;
}
