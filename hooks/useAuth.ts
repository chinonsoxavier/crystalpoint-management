"use client";
// hooks/useAuth.ts
import { useEffect } from "react";
import useUserStore from "@/app/user/user_store"; // Adjust path

// Define a custom hook for user authentication
export const useAuth = () => {
  // Get the loadUser function from the store
  const { loadUser } = useUserStore();

  // useEffect to call loadUser on initial render
  useEffect(() => {
    loadUser();
  }, [loadUser]); // Dependency array ensures it runs when loadUser is available

  // You can return other user-related state or functions from the store if needed
  // return { user, isLoading, /* etc. */ };
};
