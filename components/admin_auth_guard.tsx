// In admin-auth-wrapper.tsx

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAdminStore from "@/app/admin/_admin_store";
import { enqueueSnackbar } from "notistack";

// Define a role hierarchy for easy comparison
const ROLE_HIERARCHY = {
  super_admin: 3,
  admin: 2,
  moderator: 1,
} as const;

type AdminRole = keyof typeof ROLE_HIERARCHY;

interface AdminAuthWrapperProps {
  children: React.ReactNode;
  // Add a prop to specify the required role for this route
  requiredRole?: AdminRole;
}

const AdminAuthGuard = ({ children, requiredRole }: AdminAuthWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { authStatus, loadUser, admin } = useAdminStore();
  const [isInitialized, setIsInitialized] = useState(false);

  const adminAuthRoute = "/admin/auth";
  const isPublicRoute = pathname.startsWith(adminAuthRoute);

  // Helper function to check if the user has the required role
  const hasRequiredRole = () => {
    // If no role is required, any authenticated user can access
    if (!requiredRole) return true;

    // If user is not logged in, they don't have the role
    if (!admin) return false;

    // Compare the user's role level with the required role level
    const userRoleLevel = ROLE_HIERARCHY[admin.role as AdminRole];
    const requiredRoleLevel = ROLE_HIERARCHY[requiredRole];

    return userRoleLevel >= requiredRoleLevel;
  };

  useEffect(() => {
    let mounted = true;
    const initializeAuth = async () => {
      try {
        await loadUser();
      } catch (error) {
        console.error("Failed to load admin user:", error);
      } finally {
        if (mounted) {
          setIsInitialized(true);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [loadUser]);

  useEffect(() => {
    if (!isInitialized) return;

    // Redirect authenticated user from login page
    if (authStatus === "authenticated" && isPublicRoute) {
      router.push("/admin");
      return;
    }

    // Redirect unauthenticated user from protected routes
    if (authStatus !== "authenticated" && !isPublicRoute) {
      router.push(adminAuthRoute);
      return;
    }

    // NEW: Redirect user if they don't have the required role
    if (authStatus === "authenticated" && requiredRole && !hasRequiredRole()) {
      enqueueSnackbar("You do not have permission to access this page.", {
        variant: "error",
      });
      router.push("/admin"); // Redirect to a default page they can access
      return;
    }
  }, [authStatus, isInitialized, isPublicRoute, router, admin, requiredRole]);

  // Render children only if authenticated and has the required role
  if (authStatus === "authenticated" && hasRequiredRole()) {
    return <>{children}</>;
  }

  // Render public pages (like login)
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Fallback for unauthorized users on protected routes
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export { AdminAuthGuard };
