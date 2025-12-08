"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import useMembershipStore from "../_membership_store";
import { Crown, Star, Shield, Sparkles } from "lucide-react";

const Page = () => {
  const [cryptocurrency, setCryptocurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { getMembershipCards, membershipCards } = useMembershipStore();

  useEffect(() => {
    getMembershipCards();
  }, [getMembershipCards]);

  const selectedCard = useMemo(() => {
    return (
      membershipCards.find((m) => m.name.toLowerCase().includes("gold")) || {
        name: "Gold Member",
        tier: 3,
        requiredDeposit: "10,000",
        benefits: [
          "Lifetime VIP Investor Status",
          "Priority Access to All Projects",
          "10% Higher Profit Share",
          "Exclusive Quarterly Reports",
          "Dedicated Account Manager",
          "Invitation to Annual Gala Event",
        ],
      }
    );
  }, [membershipCards]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!cryptocurrency) return setError("Please select a cryptocurrency");
    if (!amount) return setError("Please enter the deposit amount");
    if (isNaN(Number(amount)) || Number(amount) <= 0)
      return setError("Please enter a valid number (e.g., 10000)");

    console.log("Payment Request:", { cryptocurrency, amount });
    // Handle submission
  };

  return (
    <div className="min-h-screen  text-white overflow-y-auto">


      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Investor&apos;s Gold Card
          </h1>
          <p className="mt-4 text-xl text-amber-200">
            Exclusive Lifetime Membership
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Premium Membership Card */}
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden border-0 shadow-2xl bg-linear-to-br from-amber-50 to-yellow-50">
              {/* Luxury Card Header */}
              <div className="relative h-64 bg-linear-to-r from-amber-600 via-yellow-600 to-amber-700 p-8 overflow-hidden">
                {/* Subtle Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-linear(circle_at_30%_30%,rgba(255,255,255,0.3)_0%,transparent_50%),radial-linear(circle_at_70%_70%,rgba(255,255,255,0.3)_0%,transparent_50%)]" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between text-white">
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-4xl font-bold tracking-wider">
                        CRYSTALPOINT
                      </h2>
                      <p className="text-lg opacity-90 mt-1">
                        Global Investment Network
                      </p>
                    </div>
                    <div className="text-right">
                      <Crown className="w-12 h-12 mx-auto text-yellow-300" />
                      <p className="text-sm font-medium mt-2">GOLD MEMBER</p>
                    </div>
                  </div>

                  {/* Center Medallion */}
                  <div className="flex justify-center my-6">
                    <div className="relative">
                      <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full border-4 border-yellow-300 flex items-center justify-center shadow-2xl">
                        <div className="w-24 h-24 bg-linear-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center">
                          <Sparkles className="w-14 h-14 text-white" />
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 bg-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                        LIFETIME
                      </div>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm opacity-80">Member Since</p>
                      <p className="text-xl font-bold">2025</p>
                    </div>
                    <Badge className="bg-yellow-400 text-black font-bold px-4 py-2">
                      TIER {selectedCard?.tier} • ELITE
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 bg-white">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                      <Shield className="w-8 h-8 text-amber-600" />
                      Exclusive Gold Benefits
                    </h3>
                    <ul className="space-y-3">
                      {selectedCard?.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                          <span className="text-gray-700 leading-relaxed">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t-2 border-dashed border-amber-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">
                          Minimum Deposit Required
                        </p>
                        <p className="text-3xl font-bold text-amber-600">
                          ${selectedCard?.requiredDeposit?.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Status</p>
                        <Badge className="bg-linear-to-r from-amber-500 to-yellow-500 text-white text-lg px-6 py-2">
                          PENDING ACTIVATION
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="order-1 lg:order-2">
            <Card className="bg-black/40 backdrop-blur-xl border-amber-500/20 shadow-2xl">
              <div className="p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-3">
                    Complete Your Gold Membership
                  </h2>
                  <p className="text-amber-200">
                    Secure your lifetime Gold Investor status with a one-time
                    deposit.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label className="text-lg font-semibold text-amber-200">
                      Select Cryptocurrency
                    </Label>
                    <Select
                      onValueChange={setCryptocurrency}
                      value={cryptocurrency}
                    >
                      <SelectTrigger className="mt-3 bg-white/10 border-amber-500/30 text-white placeholder:text-gray-400 h-14 text-lg">
                        <SelectValue placeholder="Choose payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {[
                            "Bitcoin",
                            "USDT (TRC20)",
                            "USDT (ERC20)",
                            "BNB",
                            "Ethereum",
                          ].map((coin) => (
                            <SelectItem
                              key={coin}
                              value={coin}
                              className="text-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                                  {coin.charAt(0)}
                                </div>
                                {coin}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-lg font-semibold text-amber-200">
                      Deposit Amount (USD)
                    </Label>
                    <Input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="10000"
                      className="mt-3 bg-white/10 border-amber-500/30 text-white placeholder:text-gray-400 h-14 text-2xl font-medium"
                    />
                    <p className="text-sm text-amber-300 mt-2">
                      Minimum: $10,000 • Enter amount without $ or commas
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-900/60 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-16 text-xl font-bold bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black shadow-xl transition-all transform hover:scale-105"
                  >
                    Activate Gold Membership
                  </Button>

                  <p className="text-center text-sm text-amber-200 mt-6">
                    <Shield className="inline w-4 h-4" /> Your deposit is
                    secured and fully refundable if not approved within 24
                    hours.
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
