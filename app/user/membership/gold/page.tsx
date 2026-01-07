"use client";
// app/user/membership/gold/page.tsx
import MembershipPage from "@/components/user/membership/membership_page";
import useUserStore from "../../user_store";
import DeActivatedMessage from "@/components/shared/deactivated_message";

export default function GoldMembershipPage() {
  const {user} = useUserStore();
  return (
    <>
    {
      !user?.isActive ? <DeActivatedMessage/> :
      <MembershipPage type="gold" />
    }
    </>
  ) 
    
}
