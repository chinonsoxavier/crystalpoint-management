import PreviousTransactions from "@/components/user/user_dashboard/previous_transactions";
import UserDashboard from "@/components/user/user_dashboard/user_dashboard"

const Page = () => {
  return (
    <div className="overflow-y-auto bg-accent md:p-6 p-4 max-h-[calc(100dvh-128px)] w-full h-full text-white">
      {/* user dashboard */}
      <UserDashboard />

      {/* previous transactions */}
      <PreviousTransactions />
    </div>
  );
}

export default Page