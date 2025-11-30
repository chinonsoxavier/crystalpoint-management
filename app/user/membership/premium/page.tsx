"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Page = () => {
  const [cryptocurrency, setCryptocurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!cryptocurrency) {
      setError("Please select a cryptocurrency");
      return;
    }

    if (!amount) {
      setError("Please enter an amount");
      return;
    }

    if (isNaN(Number(amount))) {
      setError("Must be a number (E.g 100 not $100)");
      return;
    }

    // Handle form submission
    console.log("Form submitted:", { cryptocurrency, amount });
  };

  return (
    <div className="bg-accent p-4 md:p-6 h-full overflow-y-auto">
      {/* Header */}
      <h1 className="md:text-4xl text-3xl py-3 font-bold mb-4 md:mb-6">
        Investor`s Premium Card Request
      </h1>
      <main className="text-white rounded-lg bg-accent-foreground w-full p-4 md:p-6 space-y-10">
        {/* Membership Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl py-7 md:py-12 bg-linear-to-br from-amber-500 via-orange-600 to-yellow-800 rounded-3xl p-8 shadow-2xl border border-neutral-400 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(0,0,0,.1)_25%,rgba(0,0,0,.1)_50%,transparent_50%,transparent_75%,rgba(0,0,0,.1)_75%,rgba(0,0,0,.1))] bg-size-[40px_40px]"></div>
            </div>

            <div className="relative z-10">
              {/* Medal Icon and Title */}
              <div className="flex items-center gap-4 mb-8">
                {/* Medal Icon */}
                <div className="relative md:w-16 md:h-16 w-12 h-12 shrink-0">
                  <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="md:w-8 md:h-8 h-5 w-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  {/* Ribbon */}
                  <div
                    className="absolute top-4 left-0 w-4 h-5 md:w-6 md:h-8 bg-blue-500 rounded-l-md"
                    style={{ transform: "translateX(-12px)" }}
                  ></div>
                  <div
                    className="absolute top-4 right-0 w-4 h-5 md:w-6 md:h-8 bg-blue-600 rounded-r-md"
                    style={{ transform: "translateX(12px)" }}
                  ></div>
                </div>

                <h2 className="md:text-3xl text-2xl font-bold text-white tracking-wide">
                  CrsytalPoint
                </h2>
              </div>

              {/* Card Text */}
              <div className="text-center">
                <p className="md:text-2xl text-xl font-bold text-white tracking-widest">
                  INVESTOR`S MEMBERSHIP
                </p>
                <p className="md:text-2xl text-xl font-bold text-white tracking-widest">
                  CARD
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-left md:text-lg text-gray-100 ">
          You are in this page because you requested to make payment for the
          investor`s Premium memebereship Card.
        </p>

        {/* Form */}
        <div className="flex justify-start w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-accent-foregrond w-full rounded-lg"
          >
            {/* Payment Section */}
            <div className="space-y-3">
              {/* Cryptocurrency Dropdown */}
              <div className="max-w-4xl">
                <Select required>
                  <SelectTrigger className="w-full text-accent-text">
                    <SelectValue placeholder="Select a wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
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
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* Amount Input */}
              <div className="max-w-4xl">
                <Label className="block font-semibold text-accent-text mb-2">
                  Amount
                </Label>
                <Input
                  required
                  type="text"
                  placeholder=""
                  className="w-full text-accent-text"
                />
                <p className="text-sm text-accent-text mt-2">
                  Must be a number (E.g 100 not $100)
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-400 text-sm mb-6">{error}</p>}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-5 max-w-4xl text-slate-900 font-semibold py-3 rounded-lg text-lg transition-colors"
            >
              Submit
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Page;
