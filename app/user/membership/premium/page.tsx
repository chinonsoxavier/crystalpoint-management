"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Crown,
  Clock,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useDepositStore from "../../deposit/_deposit_store";
import useMembershipStore from "../_membership_store";
import { useEffect, useState } from "react";
import LedgerBalance from "@/components/shared/ledger_balance";

const Page = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);
  const {
    depositMethods,
    fetchDepositMethods,
    setSelectedDepositMethod,
    selectedDepositMethod,
    createDepositRequest,
    isDepositLoading,
    depositInstructions,
    getDepositIntructions,
    depositRequestSuccessful,
  } = useDepositStore();

  const {
    getMembershipCards,
    getCurrentMembership,
    getMembershipEligibility,
    loading: membershipLoading,
  } = useMembershipStore();

  // Effect to transition to step 3 when deposit is successful
  useEffect(() => {
    if (depositRequestSuccessful) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(3);
        setIsTransitioning(false);
      }, 500);
    }
  }, [depositRequestSuccessful]);
  useEffect(() => {
    getMembershipEligibility();
    getCurrentMembership();
  }, []);

  useEffect(() => {
    getDepositIntructions(selectedDepositMethod?._id || "");
  }, [selectedDepositMethod]);

  useEffect(() => {
    fetchDepositMethods();
    getMembershipCards();
  }, []);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinalSubmit = () => {
    const randomHash = "0x" + Math.random().toString(36).substring(2, 15);
    createDepositRequest({
      method: selectedDepositMethod?._id ?? "",
      amount: depositAmount,
      transactionHash: randomHash,
    });
  };

  return (
    <div className="p-4 md:p-8 bg-accent min-h-screen">
      <div className="space-y-8">
        <LedgerBalance />

        <div className="bg-accent-foreground rounded-2xl overflow-hidden shadow-2xl border">
          {/* Header */}
          <div className="bg-linear-to-r from-purple-600 to-[#6c5ce7]-500 p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                  <Crown className="w-10 h-10" />
                  Premium Membership
                </h1>
                <p className="text-lg opacity-90 mt-2">
                  Unlock exclusive benefits & priority support
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-accent mt-5 mx-3 mb-3 rounded-md max-w-3xl">
            {step === 1 ? (
              /* STEP 1: Setup & Membership Logic */
              <div className="space-y-8">
                {/* Payment Form - Only show if upgrade allowed */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(2);
                  }}
                  className="space-y-6 max-w-3xl"
                >
                  <div className="space-y-4">
                    <div className="">
                      <Label className="text-lg font-semibold">
                        Payment Method
                      </Label>
                      <Select
                        onValueChange={(v) => {
                          const method = depositMethods.find(
                            (m) => m.network === v
                          );
                          setSelectedDepositMethod(method!);
                        }}
                      >
                        <SelectTrigger className="h-14 mt-1 w-full md:">
                          <SelectValue placeholder="Choose cryptocurrency" />
                        </SelectTrigger>
                        <SelectContent>
                          {depositMethods.map((m) => (
                            <SelectItem key={m.network} value={m.network}>
                              {m.name} ({m.network})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Amount</Label>
                      <Input
                        className="mt-1"
                        value={depositAmount}
                        onChange={(e) => {
                          let val = parseFloat(e.target.value);
                          if (isNaN(val)) val = 0;
                          setDepositAmount(val);
                        }}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg font-semibold bg-linear-to-r from-purple-500 to-[#6c5ce7]-500 hover:from-purple-600 hover:to-[#6c5ce7]-600"
                    disabled={depositAmount <= 0 || !selectedDepositMethod}
                  >
                    {/* <Crown className="w-5 h-5 mr-2" /> */}
                    Next
                  </Button>
                </form>
              </div>
            ) : step === 2 ? (
              /* STEP 2: Payment Instructions */
              <div className="space-y-8 max-w-3xl">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Complete Your Upgrade</h2>
                  <p className="text-muted-foreground font-bold mt-2">
                    SEND EXACTLY{" "}
                    <span className="text-green-600">${depositAmount}</span> in{" "}
                    <span>{selectedDepositMethod?.name}</span>
                  </p>
                </div>

                {/* QR + Address */}
                <div className="grid  gap-8 w-full">
                  {depositInstructions?.qrCodeUrl && (
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-white rounded-2xl shadow-xl">
                        <Image
                          src={depositInstructions.qrCodeUrl}
                          alt="QR"
                          width={200}
                          height={200}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        Scan with wallet
                      </p>
                    </div>
                  )}

                  <div className="space-y-4 w-full">
                    <div className="w-full">
                      <Label>Deposit Address</Label>
                      <div className="flex gap-4 mt-2">
                        <code className="w-full p-3 bg-muted rounded-l-lg font-mono text-sm break-all">
                          {depositInstructions?.walletAddress ||
                            selectedDepositMethod?.walletAddress}
                        </code>
                        <Button
                          onClick={() =>
                            handleCopy(
                              depositInstructions?.walletAddress ||
                                selectedDepositMethod?.walletAddress ||
                                ""
                            )
                          }
                          size="icon"
                          className="rounded-l-none"
                        >
                          {copied ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-purple-600 shrink-0" />
                  <p className="text-sm text-purple-800">
                    {depositInstructions?.instructions || ""}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleFinalSubmit}
                    disabled={isDepositLoading}
                    className="flex-1"
                  >
                    {isDepositLoading ? "Processing" : "I Have Deposited"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className={cn("space-y-6", isTransitioning && "opacity-0")}>
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">
                    Deposit Alert Successfully!
                  </h2>
                  <p className="text-accent-text max-w-md mx-auto">
                    Your deposit of alert{" "}
                    <span className="font-bold text-green-600">
                      ${depositAmount}{" "}
                    </span>
                    via{" "}
                    <span className="font-bold text-accent-text">
                      {selectedDepositMethod?.name}
                    </span>{" "}
                    has been received and is being processed.
                  </p>
                </div>

                <div className="bg-accent p-6 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent-text shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-accent-text mb-1">
                        Processing Time
                      </h3>
                      <p className="text-sm text-accent-text">
                        Your deposit will be credited to your account shortly.
                        Typically, this process takes between 10-30 minutes,
                        depending on network congestion.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-accent p-6 rounded-lg border">
                  <h3 className="font-semibold text-black dark:text-white mb-3">
                    Transaction Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Amount</span>
                      <span className="text-sm font-medium">
                        ${depositAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Method</span>
                      <span className="text-sm font-medium">
                        {selectedDepositMethod?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Network</span>
                      <span className="text-sm font-medium">
                        {selectedDepositMethod?.network}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Status</span>
                      <span className="text-sm font-medium text-purple-600">
                        Processing
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      (window.location.href =
                        "/user/transactions/deposit-transactions")
                    }
                    className="flex-1 h-12 border-slate-200"
                  >
                    View Transaction History
                  </Button>
                  <Button
                    onClick={() => setStep(1)}
                    className="flex-1 h-12 shadow-md"
                  >
                    Back
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
