// components/admin-auth-wrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAdminStore from "@/app/admin/_admin_store";

interface AdminAuthWrapperProps {
  children: React.ReactNode;
}

const AdminAuthGuard = ({ children }: AdminAuthWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { authStatus, loadUser } = useAdminStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Define the public route for admin authentication
  const adminAuthRoute = "/admin/auth";
  const isPublicRoute = pathname.startsWith(adminAuthRoute);

  useEffect(() => {
    // This effect runs once on component mount to initialize the user session.
    let mounted = true;
    const initializeAuth = async () => {
      try {
        await loadUser();
      } catch (error) {
        console.error("Failed to load admin user:", error);
      } finally {
        // Mark as initialized regardless of success or failure
        if (mounted) {
          setIsInitialized(true);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false; // Cleanup to prevent state updates on unmounted component
    };
  }, [loadUser]);

  useEffect(() => {
    // This effect handles redirections based on auth status.
    // It only runs after the initial auth check is complete.
    if (!isInitialized) {
      return;
    }

    // If the user is authenticated and trying to access the login page...
    if (authStatus === "authenticated" && isPublicRoute) {
      console.log(
        "Admin is authenticated, redirecting from auth page to dashboard..."
      );
      console.log(authStatus)
      router.push("/admin"); // Redirect to the main admin dashboard
      return;
    }

    // If the user is NOT authenticated and trying to access a protected admin route...
    if (authStatus !== "authenticated" && !isPublicRoute) {
      console.log("Admin is not authenticated, redirecting to login page...");
      router.push(adminAuthRoute); // Redirect to the admin login page
      return;
    }
  }, [authStatus, isInitialized, isPublicRoute, router]);

  // 2. If the user is authenticated, render the children (the protected admin page).
  if (authStatus === "authenticated") {
    return <>{children}</>;
  }

  // 3. If the user is not authenticated, render the children (the public login page).
  // This case is specifically for the `/admin/auth` route.
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // 4. Fallback: If none of the above conditions are met (e.g., an unauthenticated user
  // on a protected route waiting for redirect), show the loader.
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export { AdminAuthGuard };
