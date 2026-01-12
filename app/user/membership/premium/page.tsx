"use client";
// app/user/membership/premium/page.tsx
import DeActivatedMessage from "@/components/shared/deactivated_message";
import MembershipPage from "@/components/user/membership/membership_page";
import useUserStore from "../../user_store";

export default function PremiumMembershipPage() {
  const { user } = useUserStore();
  return (
    <>
      {user && !user?.isActive ? (
        <DeActivatedMessage />
      ) : (
        <MembershipPage type="premium" />
      )}
    </>
  );
}
