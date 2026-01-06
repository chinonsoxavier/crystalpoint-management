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
import useUserStore from "../user_store";
import { useTranslate } from "@/hooks/use_translate";

const Page = () => {
  const { t } = useTranslate();
  const [walletAddress, setWalletAddres] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState("");
  const {
    pendingWithdrawals,
    fetchWithdrawalsApproved,
    fetchWithdrawalsPending,
    requestWithdrawal,
    loadingWithdrawal,
  } = useWithdrawStore();
  const {
    fetchDepositMethods,
    setSelectedDepositMethod,
    selectedDepositMethod,
  } = useDepositStore();

  const { profile } = useDashboardStore();
  const { user } = useUserStore();
  const withdrawalMethods = [
    {
      _id: "USDT-TRC20",
      name: "USDT (TRC20)",
      network: "TRON",
      walletAddress: "TCi5CsQnzDCfZdRp9jYZoGpe1qD6Zpy6Je",
    },
  ];

  useEffect(() => {
    fetchDepositMethods();
    fetchWithdrawalsApproved();
    fetchWithdrawalsPending();
  }, []);

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    requestWithdrawal(
      walletAddress,
      amount,
      selectedDepositMethod?._id,
      selectedAccount
    );
  };

  return (
    <div className="p-4 h-full overflow-y-scroll bg-accent md:p-6">
      <LedgerBalance />

      <div className="center pt-5 gap-5">
        {/* <div className="bg-[#ac39d433] px-8 py-3 flex-1 md:px-3 rounded-md">
          <p className="md:text-xl text-lg font-semibold text-black dark:text-white">
            APPROVED
          </p>
          <p className="text-[#8b98d] dark:text-[#666e70] font-medium">
            ${approvedWithdrawalsTotal}
          </p>
        </div> */}

        <div className="bg-[#2bc15533] px-8 py-3 flex-1 md:px-3 rounded-md">
          <p className="md:text-xl text-lg font-semibold text-black dark:text-white">
            {t.admin.withdraw.pending}
          </p>
          <p className="text-[#8b98d] dark:text-[#666e70] font-medium">
            $             {pendingWithdrawals.reduce<number>(
              (total, withdrawal) => total + withdrawal.amount,
              0
            ) || 0}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleWithdrawal}
        className=" my-4 bg-accent-foreground p-4 md:p-6 rounded-lg"
      >
        <div className="flex gap-2 flex-col mb-6">
          <button className="pb-1 font-semibold text-black dark:text-white text-left text-lg md:text-xl">
            {t.admin.withdraw.withdraw}
          </button>

          <p className="text-[#8b98d] dark:text-gray-400  md:text-lg">
            {t.admin.withdraw.ledgerBalance}
            ${(profile?.profit_balance || 0) +
              (user?.balance.activeDeposit || 0) +
              (profile?.promotional_balance || 0)}
          </p>
          <p className="text-[#8b98d] dark:text-gray-400  md:text-lg">
            {t.admin.withdraw.activeDeposit} ${user?.balance.activeDeposit || 0}
          </p>
          <p className="text-[#8b98d] dark:text-gray-400  md:text-lg">
            {t.admin.withdraw.profitBalance} ${profile?.profit_balance || 0}
          </p>

          <p className="text-[#8b98d] dark:text-gray-400  md:text-lg">
            {t.admin.withdraw.promoBalance} ${profile?.promotional_balance || 0}
          </p>
        </div>

        <div className="flex gap-2 flex-col mb-6">
          <button className="pb-1 font-semibold text-black dark:text-white text-left border-b-2 text-lg md:text-xl">
            {t.admin.withdraw.withdrawal}
          </button>

          {/* Payment Section */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Cryptocurrency Dropdown */}
            <div className="">
              <Label className="font-semibold text-base text-accent-text mb-4">
                {t.admin.withdraw.methodOfWithdrawal}
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
                  <SelectValue placeholder={t.admin.withdraw.selectWallet} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t.admin.withdraw.walletType}</SelectLabel>
                    {withdrawalMethods.map((method, index) => (
                      <SelectItem
                        key={index}
                        className=""
                        value={method.network}
                      >
                        {method.name} ({method.network})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="">
              <Label className="font-semibold text-base text-accent-text mb-4">
                {t.admin.withdraw.chooseAccount}
              </Label>
              <Select
                required
                value={selectedAccount}
                onValueChange={setSelectedAccount}
              >
                {" "}
                <SelectTrigger className="w-full text-accent-text">
                  <SelectValue placeholder={t.admin.withdraw.selectAccount} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t.admin.withdraw.selectWalletLabel}</SelectLabel>
                    <SelectItem className="" value="bonus">
                      {t.admin.withdraw.bonusBalance}
                    </SelectItem>
                    <SelectItem className="" value="profit">
                      {t.admin.withdraw.profitBalanceOption}
                    </SelectItem>
                    <SelectItem className="" value="deposit">
                      {t.admin.withdraw.depositBalance}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Wallet Address */}
            <div className="">
              <Label className="text-base font-semibold text-accent-text mb-2">
                {t.admin.withdraw.walletAddress}
              </Label>
              <Input
                value={walletAddress}
                onChange={(e) => {
                  setWalletAddres(e.target.value);
                }}
                required
                type="text"
                placeholder=""
                className="w-full text-accent-text"
              />
            </div>

            {/* Amount Input */}
            <div className="">
              <Label className="text-base font-semibold text-accent-text mb-2">
                {t.admin.withdraw.amount}
              </Label>
              <Input
                value={amount}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setAmount(val);
                }}
                required
                type="number"
                placeholder=""
                className="w-full text-accent-text"
              />
              {/* <p className="text-sm text-accent-text mt-2">
                Must be a number (E.g 100 not $100) minimum (
                {withdrawalBalance?.minimum_withdrawal || 0})
              </p> */}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-accent-text my-8"></div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loadingWithdrawal}
            className="w-full font-semibold py-3 rounded-lg transition-colors"
          >
            {loadingWithdrawal ? t.admin.withdraw.submitting : t.admin.withdraw.submit}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;