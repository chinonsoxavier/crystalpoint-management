// components/auth-wrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "@/app/user/user_store";
import useAdminStore from "@/app/admin/_admin_store";
import useDashboardStore from "@/app/user/(user)/_dashboard_store";

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard = ({ children, requireAuth = true }: AuthWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { authStatus, loadUser } = useUserStore();
  const {loadProfile} = useDashboardStore();
  const adminAuthStatus = useAdminStore().authStatus;
  const loadAdmin = useAdminStore().loadAdmin;
  const [isInitialized, setIsInitialized] = useState(false);

  // List of public routes that don't require authentication
  const publicRoutes = ["/sign-in", "/sign-up", "/reset-password"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    // Attempt to load user data on initial mount and mark initialized after load completes
    let mounted = true;
    (async () => {
      try {
        await loadAdmin();
        await loadUser();
        await loadProfile();
      } finally {
        if (mounted) setIsInitialized(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [loadUser]);

  useEffect(() => {
    // Only run redirect logic after initialization
    if (!isInitialized) return;

    // Redirect unauthenticated users from protected routes
    if (authStatus === "idle" && requireAuth && !isPublicRoute) {
      console.log("User not authenticated, redirecting to sign-in...");

      if (adminAuthStatus === "authenticated") {
        router.push("/admin");
        return;
      }
      router.push("/sign-in");
    }

    // Redirect authenticated users from auth pages
    if (authStatus === "authenticated" && isPublicRoute) {
      console.log("User authenticated, redirecting to dashboard...");
       if (adminAuthStatus === "authenticated") {
         router.push("/admin");
         return;
       }
      router.push("/user");
    }
  }, [authStatus, isInitialized, isPublicRoute, requireAuth, router]);

  // Show a loading state while checking auth
  // if (authStatus === "loading" || !isInitialized) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  // If not authenticated and not on a public route, don't render children
  if (authStatus !== "authenticated" && authStatus === 'loading' && requireAuth && !isPublicRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export { AuthGuard };
