"use client";

import LedgerBalance from "@/components/shared/ledger_balance";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import useInvestStore from "../../../_invest_store";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const pathname = usePathname();
  const {
    activateInvestment,
    isActivatingInvestment,
    investmentSuccessfull,
    resetInvestmentSuccessfull,
  } = useInvestStore();
  const params = useParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (depositAmount <= 0) return;

    await activateInvestment({
      planId: id ?? "",
      amount: depositAmount,
    });
  };

  useEffect(() => {
    resetInvestmentSuccessfull();
  }, [pathname]);

  // If activation succeeded, show success UI
  if (investmentSuccessfull) {
    return (
      <div className="p-4 md:p-6 bg-accent h-full max-h-[calc(100dvh-128px)] flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-6">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-accent-text">
              Investment Activated Successfully!
            </h1>
            <p className="text-lg text-accent-text/80">
              Your investment of{" "}
              <strong>${depositAmount.toLocaleString()}</strong> in the
              Cristalpoint Premium plan has been activated.
            </p>
            <p className="text-sm text-accent-text/70">
              You will start earning returns according to the plan terms.
            </p>
          </div>

          <Link href="/user/invest/list">
            <Button
              className="w-full max-w-sm mx-auto py-6 text-lg font-semibold"
              size="lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Investments
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Original form (shown before success)
  return (
    <div className="p-4 md:p-6 bg-accent h-full max-h-[calc(100dvh-128px)]">
      <main className="">
        <div className="space-y-8">
          <LedgerBalance />

          {/* Form Card */}
          <div className="bg-accent-foreground rounded-lg p-8">
            <form className="max-w-4xl" onSubmit={handleSubmit}>
              <div className="space-y-2 mb-6">
                <p className="pb-3 text-2xl font-semibold text-accent-text border-b-2">
                  Invest
                </p>
                <p className="">
                  You are about to make an investment under Cristalpoint Premium
                  Plan
                </p>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <Label className="block font-semibold text-accent-text mb-2">
                  Amount
                </Label>
                <Input
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setDepositAmount(isNaN(v) ? 0 : v);
                  }}
                  required
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="e.g. 500"
                  className="w-full text-accent-text"
                  value={depositAmount || ""}
                />
                <p className="text-sm text-accent-text mt-2">
                  Must be a number (e.g. 100 not $100)
                </p>
              </div>

              {/* Divider */}
              <div className="border-t my-8"></div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full font-semibold py-3 rounded-lg transition-colors"
                disabled={isActivatingInvestment || depositAmount <= 0}
              >
                {isActivatingInvestment
                  ? "ACTIVATING..."
                  : "ACTIVATE INVESTMENT"}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
