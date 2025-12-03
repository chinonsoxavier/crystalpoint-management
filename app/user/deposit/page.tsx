"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LedgerBalance from "@/components/shared/ledger_balance";
import useDepositStore from "./_deposit_store";

const Page = () => {
  const { depositMethods, fetchDepositMethods,setSelectedDepositMethod,selectedDepositMethod } = useDepositStore();
  const [copied, setCopied] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const walletAddress = selectedDepositMethod
    ? selectedDepositMethod.walletAddress
    : "";
    console.log(selectedDepositMethod)
  const handleCopy = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetchDepositMethods();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  return (
    <div className="p-4 md:p-6 bg-accent h-full max-h-[calc(100dvh-128px)]">
      <main className="">
        <div className="space-y-8">
          <LedgerBalance />

          {/* Form Card */}
          <div className="bg-accent-foreground rounded-lg p-8">
            {/* Tabs */}
            {!isSubmitted ? (
              <form className="max-w-4xl" onSubmit={handleSubmit}>
                <div className="flex gap-8 mb-6 border-b">
                  <button className="pb-3 font-semibold text-accent-text border-b-2">
                    Deposit
                  </button>
                </div>

                {/* Payment Section */}
                <div className="mb-6">
                  <Label className="font-semibold text-accent-text mb-4">
                    Payment
                  </Label>

                  {/* Cryptocurrency Dropdown */}
                  <div className="mb-6">
                    <Select required
  onValueChange={(value) => {
    const selected = depositMethods.find((m) => m.network === value);
    setSelectedDepositMethod(selected!);
  }}>
                      <SelectTrigger className="w-full text-accent-text">
                        <SelectValue placeholder="Select a wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Wallet Type</SelectLabel>
                          {depositMethods.map((method, index) => (
                            <SelectItem
                              key={index}
                              className=""
                              value={method.network}
                            >
                              {method.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        {/* <SelectGroup>
                          <SelectLabel>Crypto Deposit</SelectLabel>

                          <SelectItem className="" value="Bitcoin">
                            Bitcoin
                          </SelectItem>
                          <SelectItem className="" value="USDT (TRC20)">
                            USDT (TRC20)
                          </SelectItem>
                          <SelectItem className="" value="USDT (ERC20)">
                            USDT (ERC20)
                          </SelectItem>
                          <SelectItem className="" value="BNB">
                            BNB
                          </SelectItem>
                          <SelectItem className="" value="Ethereum">
                            Ethereum
                          </SelectItem>
                        </SelectGroup> */}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-6 max-w-4xl">
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
                      placeholder=""
                      className="w-full text-accent-text"
                    />
                    <p className="text-sm text-accent-text mt-2">
                      Must be a number (E.g 100 not $100)
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-accent-text my-8"></div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full font-semibold py-3 rounded-lg transition-colors"
                >
                  Submit
                </Button>
              </form>
            ) : (
              <form className="max-w-4xl">
                <div className="border-b py-4">
                  <p className="text-accent-text font-medium text-lg">
                    You are about to make a deposit of ${depositAmount} to this{" "}
                    {selectedDepositMethod?.name}
                    wallet
                  </p>
                </div>

                <div className="border-b pb-4 space-y-5">
                  <div className="space-y-1 pt-4">
                  
                    <p className="text-[#b3b3b3] text-sm">
                      Copy the wallet address to make your payment. Once payment
                      has been made, wait a few minutes for the transaction to be
                      confirmed and your account credited.
                    </p>
                  </div>
                  <div className="flex-1 bg-accent rounded-lg px-4 h-12 flex items-center justify-start border border-border">
                    <p className="text-sm font-mono text-accent-text break-all">
                      {walletAddress}
                    </p>
                  </div>

                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="w-full h-12 text-base font-medium bg-background/80 backdrop-blur hover:bg-accent hover:text-accent-foreground transition-all duration-200 border-border/50"
                  >
                    {copied ? (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy Wallet Address
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-amber-500/10 my-4 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-amber-500 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-sm text-amber-200">
                    <strong>Important:</strong> Send{" "}
                    <strong>only {selectedDepositMethod?.name} {" "} {selectedDepositMethod?.network} {" "}</strong> to this address. Sending
                    any other cryptocurrency will result in permanent loss of
                    funds.
                  </p>
                </div>
                {/* <Button className="max-w-full w-full" type="submit">
                  Submit
                </Button> */}
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
