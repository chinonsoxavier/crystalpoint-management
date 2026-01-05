"use client";
import React from "react";
import DashboardHeader from "./dashboard_header";
import DashboardSidemenu from "./dashboard_sidemenu";
import useUserStore from "@/app/user/user_store";
import { AuthGuard } from "../auth_guard";
import DashboardAdPrompt from "../shared/ad_prompt";

// New component for the deactivation warning
const AccountDeactivatedWarning = () => {
  return (
    <div className="bg-red-500 text-white p-4 mx-4 my-2 rounded-lg shadow-lg flex items-center justify-between">
      <div className="flex items-center">
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path>
        </svg>
        <p className="font-medium">
          Your account has been deactivated. Please contact support for
          assistance.
        </p>
      </div>
      <button className="text-white hover:text-gray-200">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
const hasActiveFeature = user?.adPrompts ? Object.values(user.adPrompts).some(value => value === true) : false;

  return (
    <AuthGuard>
      <main className={`relative bg-accent overflow-hidden`}>
        {/* header */}
        <DashboardHeader />

        {/* Account deactivation warning - positioned prominently */}

        {!user?.isActive && user && (
          <div className="absolute top-20 left-0 right-0 z-30 p-4">
            <AccountDeactivatedWarning />
          </div>
        )}

        <section className="flex h-[calc(100dvh-80px-48px)] w-full">
          <aside className="">
            <DashboardSidemenu totalDeposit={user?.balance?.deposit ?? 0} />
          </aside>

          <section className="w-full overflow-y-auto">
            <div
              className={`pt-4 pb-4 overflow-y-auto h-[20%] px-4 md:pt-6 md:px-6 ${
                user?.showAdPrompt && hasActiveFeature ? "" : "hidden"
              }`}
            >
              <DashboardAdPrompt />
            </div>
            <div
              className={`${
                user?.showAdPrompt && hasActiveFeature ? "h-[80%]" : "h-full"
              }`}
            >
              {/* If account is deactivated, show a message instead of the regular content */}
              {!user?.isActive && user ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
                    <svg
                      className="w-16 h-16 text-red-500 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      ></path>
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Account Deactivated
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Your account has been deactivated by an administrator. If
                      you believe this is an error, please contact our support
                      team.
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                      Contact Support
                    </button>
                  </div>
                </div>
              ) : (
                children
              )}
            </div>
          </section>
        </section>

        {/* footer */}
        <footer
          className={`center z-20 relative w-full bg-accent-foreground h-12 text-white `}
        >
          <p className="sm:text-[15px] text-accent-text text-sm text-center px-4">
            Copyright © 2019 - 2025 | CristalPoint Management. All Right
            Reserved.
          </p>
        </footer>
      </main>
    </AuthGuard>
  );
};

export default DashboardLayout;
