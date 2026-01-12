"use client";
// app/user/membership/silver/page.tsx
import MembershipPage from "@/components/user/membership/membership_page";
import useUserStore from "../../user_store";
import DeActivatedMessage from "@/components/shared/deactivated_message";

export default function SilverMembershipPage() {
  const { user } = useUserStore();
  return (
    <>
      {user && !user?.isActive ? (
        <DeActivatedMessage />
      ) : (
        <MembershipPage type="silver" />
      )}
    </>
  );
}
