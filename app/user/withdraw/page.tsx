"use client";
import LedgerBalance from "@/components/shared/ledger_balance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useWithdrawStore from "./_withdraw_store";
import useDashboardStore from "../(user)/_dashboard_store";
import useDepositStore from "../deposit/_deposit_store";
import { useEffect, useState } from "react";

const Page = () => {
  const [walletAddress, setWalletAddres] = useState('');
  const [amount, setAmount] = useState(0);
  const {
    approvedWithdrawals,
    pendingWithdrawals,
    fetchWithdrawalsApproved,
    fetchWithdrawalsPending,
    requestWithdrawal,
    loadingWithdrawal
  } = useWithdrawStore();
  const {
    depositMethods,
    fetchDepositMethods,
    setSelectedDepositMethod,
    selectedDepositMethod,
    
  } = useDepositStore();

  const {profile} = useDashboardStore();
  const withdrawalMethods = depositMethods;
  const selectedWithdrawalMethod = selectedDepositMethod;

  useEffect(() => {
    fetchDepositMethods();
    fetchWithdrawalsApproved();
    fetchWithdrawalsPending();
  }, [])
  

  const approvedWithdrawalsTotal = approvedWithdrawals.reduce(
    (total, withdrawal) => total + withdrawal,
    0
  );

  const pendingWithdrawalsTotal = pendingWithdrawals.reduce(
    (total, withdrawal) => total + withdrawal,
    0
  );

  const handleWithdrawal = (e:React.FormEvent)=>{
    e.preventDefault();
      requestWithdrawal(walletAddress,amount);
  }

  return (
    <div className="p-4 h-full overflow-y-scroll bg-accent md:p-6">
      <LedgerBalance />

      <div className="center pt-5 gap-5">
        <div className="bg-[#ac39d433] px-8 py-3 flex-1 md:px-3 rounded-md">
          <p className="md:text-xl text-lg font-semibold text-black dark:text-white">
            APPROVED
          </p>
          <p className="text-[#8b98d] dark:text-[#666e70] font-medium">
            ${pendingWithdrawalsTotal}
          </p>
        </div>

        <div className="bg-[#2bc15533] px-8 py-3 flex-1 md:px-3 rounded-md">
          <p className="md:text-xl text-lg font-semibold text-black dark:text-white">
            PENDING
          </p>
          <p className="text-[#8b98d] dark:text-[#666e70] font-medium">
            ${approvedWithdrawalsTotal}
          </p>
        </div>
      </div>

      <form onSubmit={handleWithdrawal} className=" my-4 bg-accent-foreground p-4 md:p-6 rounded-lg">
        <div className="flex gap-2 flex-col mb-6">
          <button className="pb-1 font-semibold text-black dark:text-white text-left text-lg md:text-xl">
            Withdraw
          </button>

          <p className="text-[#8b98d] dark:text-[#666e70]  md:text-lg">
            Ledger Balance: 0$
          </p>
          <p className="text-[#8b98d] dark:text-[#666e70]  md:text-lg">
            Profit Balance: ${profile?.profit_balance || 0}
          </p>
          <p className="text-[#8b98d] dark:text-[#666e70]  md:text-lg">
            Promo Balance: ${profile?.promotional_balance || 0}
          </p>
        </div>

        <div className="flex gap-2 flex-col mb-6">
          <button className="pb-1 font-semibold text-black dark:text-white text-left border-b-2 text-lg md:text-xl">
            Withdrawal
          </button>

          {/* Payment Section */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Cryptocurrency Dropdown */}
            <div className="">
              <Label className="font-semibold text-base text-accent-text mb-4">
                Method of withdraal
              </Label>
              <Select
                required
                onValueChange={(value) => {
                  const selected = withdrawalMethods.find(
                    (m) => m.network === value
                  );
                  setSelectedDepositMethod(selected!);
                }}
              >
                <SelectTrigger className="w-full text-accent-text">
                  <SelectValue placeholder="Select a wallet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Wallet Type</SelectLabel>
                    {withdrawalMethods.map((method, index) => (
                      <SelectItem
                        key={index}
                        className=""
                        value={method.network}
                      >
                        {method.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                 </SelectContent>
              </Select>
            </div>

            <div className="">
              <Label className="font-semibold text-base text-accent-text mb-4">
                Choose an account
              </Label>
              <Select required>
                <SelectTrigger className="w-full text-accent-text">
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sellect Wallet</SelectLabel>
                    <SelectItem className="" value="ledger balance">
                      Ledger Balance
                    </SelectItem>
                    <SelectItem className="" value="Profit Account">
                      Profit Account
                    </SelectItem>
                    <SelectItem className="" value="Promo Account">
                      Promo Account
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Wallet Address */}
            <div className="">
              <Label className="text-base font-semibold text-accent-text mb-2">
                Wallet Address
              </Label>
              <Input
              value={walletAddress}
              onChange={(e)=>{setWalletAddres(e.target.value)}}
                required
                type="text"
                placeholder=""
                className="w-full text-accent-text"
              />
            </div>

            {/* Amount Input */}
            <div className="">
              <Label className="text-base font-semibold text-accent-text mb-2">
                Amount
              </Label>
              <Input
              value={amount}
              onChange={(e)=>{
                const val = parseInt(e.target.value);
                        setAmount(val);
              }}
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

          {/* Divider */}
          <div className="border-t border-accent-text my-8"></div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full font-semibold py-3 rounded-lg transition-colors"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
