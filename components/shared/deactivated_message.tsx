"use client";

import useUserStore from "@/app/user/user_store";
import { useTranslate } from "@/hooks/use_translate";
import { useEffect, useState } from "react";

const DeActivatedMessage = () => {
  const { t } = useTranslate();
  const [loading, setLoading] = useState(true);
  const { user, authStatus } = useUserStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  console.log("Loading state:", loading);

  return (
    <div className="t-[30%] center my-auto h-full">
      {loading ? (
        // Loading component
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        // Deactivated message component
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
              {t.landing.deactivated.deactivated}
            </h2>
            <p className="text-gray-600 mb-6">{t.landing.deactivated.message}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              {t.landing.deactivated.contact}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeActivatedMessage;