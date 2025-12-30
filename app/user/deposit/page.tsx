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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LedgerBalance from "@/components/shared/ledger_balance";
import useDepositStore from "./_deposit_store";
import {
  Check,
  Copy,
  AlertTriangle,
  QrCode,
  Loader2,
  Info,
  Wallet,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Page = () => {
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

  const [step, setStep] = useState(1); // 1: Setup, 2: Instructions/Payment, 3: Success
  const [copied, setCopied] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    fetchDepositMethods();
    getDepositIntructions(selectedDepositMethod?._id || "");
  }, [depositAmount, selectedDepositMethod]);

  useEffect(() => {
    setStep(1);
  }, [pathname]);

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

  // Helper to generate a unique random transaction hash
  const generateRandomHash = () => {
    const chars = "abcdef0123456789";
    let result = "0x";
    for (let i = 0; i < 40; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDepositMethod && depositAmount > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(2);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleFinalSubmit = () => {
    const randomHash = generateRandomHash();
    createDepositRequest({
      method: selectedDepositMethod?._id ?? "",
      amount: depositAmount,
      transactionHash: randomHash,
    });
  };

  const handleNewDeposit = () => {
    // Reset state for a new deposit
    setStep(1);
    setDepositAmount(0);
    // setSelectedDepositMethod(undefined);
  };

  return (
    <div className="p-4 md:p-8 bg-accent min-h-screen">
      <div className="space-y-6">
        <LedgerBalance />

        <div className="bg-accent-foreground max-w-3xl rounded-xl overflow-hidden shadow-lg border w-full">
          <div className="p-8 w-full">
            {step === 1 ? (
              /* --- STEP 1: CONFIGURATION --- */
              <form onSubmit={handleProceedToPayment} className="space-y-6">
                <div className="bg-accent p-4 rounded-lg border border-blue-100 flex gap-3">
                  <Info className="w-5 h-5 text-accent-text shrink-0 mt-0.5" />
                  <p className="text-sm text-accent-text">
                    Select your preferred payment method and enter the amount
                    you wish to deposit.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="deposit-method"
                      className="text-base font-medium flex items-center gap-2"
                    >
                      <Wallet className="w-4 h-4" />
                      Deposit Method
                    </Label>
                    <Select
                      required
                      onValueChange={(value) => {
                        const selected = depositMethods.find(
                          (m) => m.network === value
                        );
                        setSelectedDepositMethod(selected!);
                      }}
                    >
                      <SelectTrigger className="h-12 w-full text-base">
                        <SelectValue placeholder="Choose a cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        {depositMethods.map((method, index) => (
                          <SelectItem key={index} value={method.network}>
                            <div className="flex items-center gap-2">
                              <span>{method.name}</span>
                              <span className="text-slate-500 text-sm">
                                ({method.network})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="amount"
                      className="text-base font-medium flex items-center gap-2"
                    >
                      <DollarSign className="w-4 h-4" />
                      Amount
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                        ${" "}
                      </span>
                      <Input
                        id="amount"
                        className="pl-8 h-9 text-lg font-medium"
                        type="number"
                        placeholder="0.00"
                        onChange={(e) =>
                          setDepositAmount(parseFloat(e.target.value) || 0)
                        }
                        required
                      />
                    </div>
                    {selectedDepositMethod &&
                      depositInstructions?.minimumAmount &&
                      depositAmount < depositInstructions.minimumAmount && (
                        <p className="text-[red] text-sm">
                          Minimum deposit amount for{" "}
                          {selectedDepositMethod?.name} is $
                          {depositInstructions?.minimumAmount ?? 0}
                        </p>
                      )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold shadow-md"
                  disabled={
                    !selectedDepositMethod ||
                    depositAmount <= (depositInstructions?.minimumAmount ?? 0)
                  }
                >
                  Continue to Payment
                </Button>
              </form>
            ) : step === 2 ? (
              /* --- STEP 2: INSTRUCTIONS & QR CODE --- */
              <div className={cn("space-y-6", isTransitioning && "opacity-0")}>
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-bold">Complete Your Payment</h2>
                  <p className="text-slate-600">
                    Send exactly{" "}
                    <span className="text-green-500 font-bold text-lg">
                      ${depositAmount}
                    </span>{" "}
                    worth of {selectedDepositMethod?.name}
                  </p>
                </div>

                {/* QR Code Section */}
                {depositInstructions?.qrCodeUrl && (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-6 bg-white rounded-xl border-2 border-slate-200 shadow-md">
                      <Image
                        src={depositInstructions.qrCodeUrl}
                        alt="Payment QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                    <p className="text-sm text-slate-500">
                      Scan this QR code with your wallet
                    </p>
                  </div>
                )}

                {/* Wallet Address Box */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Your Personal Deposit Address
                  </Label>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-muted p-3 rounded-lg font-mono text-sm break-all border">
                      {depositInstructions?.walletAddress ||
                        selectedDepositMethod?.walletAddress}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 h-12 w-12"
                      onClick={() =>
                        handleCopy(
                          depositInstructions?.walletAddress ||
                            selectedDepositMethod?.walletAddress ||
                            ""
                        )
                      }
                    >
                      {copied ? (
                        <Check className="text-green-500 w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Instructions Text */}
                {depositInstructions?.instructions && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="text-sm font-bold mb-2 flex items-center gap-2 text-blue-800">
                      <QrCode className="w-4 h-4" /> Instructions
                    </h4>
                    <p className="text-sm leading-relaxed text-blue-700">
                      {depositInstructions.instructions}
                    </p>
                  </div>
                )}

                {/* Warning */}
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-sm text-amber-800 leading-tight">
                    Only send <strong>{selectedDepositMethod?.name}</strong> via
                    the <strong>{selectedDepositMethod?.network}</strong>{" "}
                    network. Sending any other coin or using a different network
                    will result in permanent loss.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-12 border-slate-200"
                  >
                    Go Back
                  </Button>
                  <Button
                    onClick={handleFinalSubmit}
                    disabled={isDepositLoading}
                    className="flex-1 h-12 shadow-md"
                  >
                    {isDepositLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "I have made the payment"
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              /* --- STEP 3: SUCCESS --- */
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
                      <span className="text-sm font-medium text-amber-600">
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
                    onClick={handleNewDeposit}
                    className="flex-1 h-12 shadow-md"
                  >
                    Make Another Deposit
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
