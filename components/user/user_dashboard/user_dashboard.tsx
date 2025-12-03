"use client";
import useUserStore from "@/app/user/user_store";
import { BalanceCards } from "./balance_cards";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import useDashboardStore from "@/app/user/(user)/_dashboard_store";
const UserDashboard = () => {
  const {referralLink,loadProfile} = useDashboardStore();
  const [copied, setCopied] = useState(false);
  const {user} = useUserStore();

useEffect(() => {
    loadProfile();
}, []);


  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const { showBalance } = useUserStore();
  const metrics = [
    { label: "LEDGER BALANCE", value: "$0" },
    { label: "PROFIT BALANCE", value: "$0" },
    { label: "ALL DEPOSITS", value: "$0" },
    { label: "WITHDRAWALS", value: "$0" },
    { label: "INVESTMENTS", value: "$0" },
  ];
  return (
    <div className="flex-1 p-1 smedium:p-2 overflow-y-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl text-black dark:text-white font-bold mb">
          Dashboard
        </h1>
        <p className="dark:text-white text-black text-lg font-semibold mb-6">
          Welcome : <span className="text-accent-text">{user?.profile?.firstName} {' '} {user?.profile?.lastName}</span>
        </p>
        {/* <p className="text-lg font-semibold text-black dark:text-white mb-8">
          Current Account Type: <span className="text-accent-text">Newbie</span>
        </p> */}
        <div className="bg-accent-foreground backdrop-blur-sm rounded-xl p-5 mb-6">
          <p className="text-base text-foreground mb-3 font-medium">
            Share this link with friends to earn rewards
          </p>
          <div className="flex flex-col w-full sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 bg-accent w-full rounded-lg px-4 py-3 flex items-center justify-start border border-border">
              <p className="text-sm font-mono text-foreground break-all">
                {showBalance ? referralLink : "••••••••••••••••••••••••"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleCopy}
                className={`gap-2 transition-all duration-300 ${
                  copied
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} className="text-white"/>
                    <span className="text-white">Copy</span>
                  </>
                )}
              </Button>
              <Button
                onClick={handleCopy}
                variant="outline"
                className={`gap-2 hidden transition-all duration-300`}
              >
               View Details
              </Button>
            </div>
          </div>
        </div>

        {/* <ReferralSection showValues={showValues} /> */}
      </div>

      <BalanceCards showValues={showBalance} />
    </div>
  );
};

export default UserDashboard;
