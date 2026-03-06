"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "@/app/user/user_store";
import useAdminStore from "@/app/admin/_admin_store";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedStatuses?: ("authenticated" | "inactive")[]; // Which statuses can access
}

const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/forgot-password",
];
const adminRoutes = ["/admin"]; // Add your admin routes here

export const AuthGuard = ({
  children,
  requireAuth = true,
  allowedStatuses = ["authenticated"],
}: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { authStatus, isInitialized, initializeAuth, user } = useUserStore();
  const { authStatus: adminAuthStatus, loadAdmin } = useAdminStore();

  const [isLoading, setIsLoading] = useState(true);

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Initial auth check
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // Only initialize if not already done
      if (!isInitialized) {
        await Promise.all([initializeAuth(), loadAdmin()]);
      }

      if (mounted) {
        setIsLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [isInitialized, initializeAuth, loadAdmin]);

  // Handle redirects
  useEffect(() => {
    if (isLoading || !isInitialized) return;

    // Handle inactive accounts
    if (authStatus === "inactive" && !isPublicRoute) {
      // Allow access to specific pages for inactive users (e.g., contact support)
      // Or redirect to a deactivated page
      if (pathname !== "/account-deactivated") {
        // Optionally redirect to a deactivated page
        // router.push("/account-deactivated");
      }
      return;
    }

    // Redirect unauthenticated users from protected routes
    if (authStatus === "unauthenticated" && requireAuth && !isPublicRoute) {
      if (adminAuthStatus === "authenticated" && isAdminRoute) {
        router.push("/admin");
      } else {
        router.push("/sign-in");
      }
      return;
    }

    // Redirect authenticated users away from auth pages
    if (
      (authStatus === "authenticated" || authStatus === "inactive") &&
      isPublicRoute
    ) {
      if (adminAuthStatus === "authenticated") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
      return;
    }

    // Check if user has required status for this route
    if (
      requireAuth &&
      !allowedStatuses.includes(authStatus as never) &&
      !isPublicRoute
    ) {
      if (authStatus === "inactive") {
        // Inactive users stay on current page but see warning
        return;
      }
      router.push("/sign-in");
    }
  }, [
    authStatus,
    isLoading,
    isInitialized,
    pathname,
    requireAuth,
    router,
    adminAuthStatus,
    isPublicRoute,
    isAdminRoute,
    allowedStatuses,
  ]);

  // Show loading spinner during initial check
  if (isLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading state during auth operations (login/register)
  if (authStatus === "loading" && !isPublicRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

// Specialized guard for inactive accounts
export const InactiveAccountGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { authStatus } = useUserStore();

  if (authStatus === "inactive") {
    return (
      <div className="min-h-screen bg-background">
        {/* <AccountDeactivatedBanner /> */}
        <div className="">{children}</div>
      </div>
    );
  }

  return <>{children}</>;
};

// Banner component for deactivated accounts
// const AccountDeactivatedBanner = () => {
//   const router = useRouter();

//   const handleContactSupport = () => {
//     router.push("/support");
//   };

//   const handleLogout = async () => {
//     await useUserStore.getState().logout();
//     router.push("/sign-in");
//   };

//   return (
//     <div className="bg-red-600 text-white px-4 py-3 shadow-lg">
//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <svg
//             className="w-6 h-6 flex-shrink-0"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//             />
//           </svg>
//           <div>
//             <p className="font-semibold">Account Deactivated</p>
//             <p className="text-sm text-red-100">
//               Your account has been deactivated. Please contact support for
//               assistance.
//             </p>
//           </div>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={handleContactSupport}
//             className="px-4 py-2 bg-white text-red-600 rounded-md font-medium hover:bg-red-50 transition-colors"
//           >
//             Contact Support
//           </button>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-700 text-white rounded-md font-medium hover:bg-red-800 transition-colors"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
