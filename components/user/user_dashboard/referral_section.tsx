"use client";

import { Copy, Check, Users, Gift, TrendingUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export function ReferralSection({ showValues }: { showValues: boolean }) {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://cristalpointmanagement.com/ref/test";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-accent-foreground p-6 mb-8">
      {/* Background decoration with theme-aware colors */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full filter blur-3xl opacity-70"></div>

      <div className="relative z-10">
        {/* Header with better contrast */}
        <div className="flex items-center mb-6">
          <div className="bg-accent/10 p-3 rounded-xl mr-4 border border-primary/20">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Your Referral Link
            </h2>
            <p className="text-sm text-muted-foreground">
              Share and earn rewards
            </p>
          </div>
        </div>
        {/* Referral link container with better contrast */}
        <div className="bg-accent-foreground backdrop-blur-sm rounded-xl p-5 mb-6">
          <p className="text-base text-foreground mb-3 font-medium">
            Share this link with friends to earn rewards
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 bg-background rounded-lg px-4 py-3 flex items-center justify-start border border-border">
              <p className="text-sm font-mono text-foreground break-all">
                {showValues ? referralLink : "••••••••••••••••••••••••"}
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
                    <Copy size={18} />
                    <span>Copy</span>
                  </>
                )}
              </Button>
              <Link href="/user/referrals">
                <Button
                  variant="outline"
                  className="border-border hover:bg-muted"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Stats cards with better color scheme */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-accent border shadow rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="bg-green-500/10 p-2 rounded-lg mr-3">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm text-muted-foreground">Referral Bonus</p>
            </div>
            <p className="text-xl font-bold text-foreground">10%</p>
          </div>

          <div className="bg-accent border shadow rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="bg-blue-500/10 p-2 rounded-lg mr-3">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
            </div>
            <p className="text-xl font-bold text-foreground">12</p>
          </div>

          <div className="bg-accent border shadow rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="bg-primary/10 p-2 rounded-lg mr-3">
                <Gift className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Rewards Earned</p>
            </div>
            <p className="text-xl font-bold text-foreground">$240</p>
          </div>
        </div>
      </div>
    </div>
  );
}
