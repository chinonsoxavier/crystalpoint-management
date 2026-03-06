"use client";

import useUserStore from "@/app/user/user_store";
import { useTranslate } from "@/hooks/use_translate";
import { useEffect, useState } from "react";

const DeActivatedMessage = () => {
  const { t } = useTranslate();
  const [ismounted, setIsMounted] = useState(false);
  const { user, authStatus } = useUserStore();
  // const userIsActive = authStatus === "loading" && isUserActive ? true : false;
  const phoneNumber = "17042190083";
  const message = `Hello! I need assistance with my account.`;

  // Format the WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message,
  )}`;
  useEffect(() => {
    if(!ismounted){
      if (authStatus === "loading") {
        setIsMounted(true);
      }
    }
    // const timer = setTimeout(() => {
    // }, 5000);

    // // Clean up the timer when component unmounts
    // return () => clearTimeout(timer);
  }, [user, authStatus]);

  // console.log("Loading state:", loading);

  return (
    <div className="t-[30%] center my-auto h-full">
      {/* {authStatus === "fetching-user" ? (
        // Loading component
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : ( */}
        {/* // Deactivated message component */}
      
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
            <p className="text-gray-600 mb-6">
              {t.landing.deactivated.message}
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact customer support."
              >
                {t.landing.deactivated.contact}
              </a>
            </button>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default DeActivatedMessage;
