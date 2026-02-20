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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, Gift, DollarSign } from "lucide-react";
import useWithdrawStore from "./_withdraw_store";
import useDashboardStore from "../(user)/_dashboard_store";
import useDepositStore from "../deposit/_deposit_store";
import { useEffect, useState } from "react";
import useUserStore from "../user_store";
import { useTranslate } from "@/hooks/use_translate";
import DeActivatedMessage from "@/components/shared/deactivated_message";

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
    requestTotalWithdrawal
  } = useWithdrawStore();
  const {
    fetchDepositMethods,
    setSelectedDepositMethod,
    selectedDepositMethod,
  } = useDepositStore();

  const { profile } = useDashboardStore();
 const { user, isUserActive } = useUserStore();
 const userIsActive = user?.isActive && isUserActive;
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
    if (selectedAccount === 'ledger') {
      requestTotalWithdrawal(walletAddress, selectedDepositMethod?._id);
      return;
    }
    requestWithdrawal(
      walletAddress,
      amount,
      selectedDepositMethod?._id,
      selectedAccount
    );
  };

  // Calculate total ledger balance
  const totalLedgerBalance =
    (profile?.profit_balance || 0) +
    (user?.balance.deposit || 0) +
    (profile?.promotional_balance || 0);

  return (
    <div className="p-4 h-full overflow-y-scroll bg-accent md:p-6">
      {!userIsActive ? (
        <>
          <DeActivatedMessage />
        </>
      ) : (
        <>
          <LedgerBalance />

          <div className="center pt-5 gap-5">
            <div className="bg-[#2bc15533] px-8 py-3 flex-1 md:px-3 rounded-md">
              <p className="md:text-xl text-lg font-semibold text-black dark:text-white">
                {t.admin.withdraw.pending}
              </p>
              <p className="text-[#8b98d] dark:text-[#666e70] font-medium">
                $
                {pendingWithdrawals.reduce<number>(
                  (total, withdrawal) => total + withdrawal.amount,
                  0,
                ) || 0}
              </p>
            </div>
          </div>
          <form className="my-4 bg-accent-foreground p-4 md:p-6 rounded-lg">
            <div className="flex gap-2 flex-col mb-6">
              <button className="pb-1 font-semibold text-black dark:text-white text-left text-lg md:text-xl">
                {t.admin.withdraw.withdraw}
              </button>

              {/* Ledger Balance Card - Main Wallet */}
              <Card className="bg-accent text-white border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wallet className="h-5 w-5" />
                    {t.admin.withdraw.ledgerBalanceTitle}
                  </CardTitle>
                  <p className="text-sm opacity-90">
                    {t.admin.withdraw.ledgerBalanceDescription}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold mb-4">
                    ${totalLedgerBalance.toLocaleString()}
                  </div>

                  {/* Balance Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {t.admin.withdraw.depositBalance}
                        </span>
                      </div>
                      <div className="text-lg font-semibold">
                        ${user?.balance.deposit || 0}
                      </div>
                    </div>

                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {t.admin.withdraw.profitBalance}
                        </span>
                      </div>
                      <div className="text-lg font-semibold">
                        ${profile?.profit_balance || 0}
                      </div>
                    </div>

                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Gift className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {t.admin.withdraw.promoBalance}
                        </span>
                      </div>
                      <div className="text-lg font-semibold">
                        ${profile?.promotional_balance || 0}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                        (m) => m.network === value,
                      );
                      setSelectedDepositMethod(selected!);
                    }}
                  >
                    <SelectTrigger className="w-full text-accent-text">
                      <SelectValue
                        placeholder={t.admin.withdraw.selectWallet}
                      />
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

                {/* Account Selection - From Ledger Balance */}
                <div className="">
                  <Label className="font-semibold text-base text-accent-text mb-4">
                    {t.admin.withdraw.selectFromLedger}
                  </Label>
                  <Select
                    required
                    value={selectedAccount}
                    onValueChange={setSelectedAccount}
                  >
                    <SelectTrigger className="w-full text-accent-text">
                      <SelectValue
                        placeholder={t.admin.withdraw.selectAccountFromLedger}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          {t.admin.withdraw.ledgerBalanceComponents}
                        </SelectLabel>
                        <SelectItem className="" value="ledger">
                          <div className="flex items-center justify-between w-full">
                            <span>{t.admin.withdraw.ledgerBalance}</span>
                            <span className="text-muted-foreground ml-2">
                              $ {totalLedgerBalance}
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem className="" value="profit">
                          <div className="flex items-center justify-between w-full">
                            <span>{t.admin.withdraw.profitBalance}</span>
                            <span className="text-muted-foreground ml-2">
                              ${profile?.profit_balance || 0}
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem className="" value="bonus">
                          <div className="flex items-center justify-between w-full">
                            <span>{t.admin.withdraw.promoBalance}</span>
                            <span className="text-muted-foreground ml-2">
                              ${profile?.promotional_balance || 0}
                            </span>
                          </div>
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
                    placeholder={t.admin.withdraw.walletAddressPlaceholder}
                    className="w-full text-accent-text"
                  />
                </div>

                {/* Amount Input */}
                <div className="">
                  <Label className="text-base font-semibold text-accent-text mb-2">
                    {t.admin.withdraw.amount}
                  </Label>
                  <Input
                    value={
                      selectedAccount === "ledger"
                        ? (user?.balance?.deposit ?? 0) +
                            (user?.balance?.profit ?? 0) +
                            (user?.balance?.bonus ?? 0) || 0
                        : amount || 0
                    }
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setAmount(val);
                    }}
                    required
                    type="number"
                    disabled={selectedAccount === "ledger"}
                    placeholder={t.admin.withdraw.amountPlaceholder}
                    className="w-full text-accent-text"
                  />
                  <p className="text-sm text-accent-text mt-2">
                    {t.admin.withdraw.withdrawingFromLedger}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-accent-text my-8"></div>

              {/* Submit Button */}
              <Button
                type="submit"
                onClick={handleWithdrawal}
                disabled={
                  loadingWithdrawal || !selectedAccount || !walletAddress
                }
                className="w-full font-semibold py-3 rounded-lg transition-colors"
              >
                {loadingWithdrawal
                  ? t.admin.withdraw.submitting
                  : t.admin.withdraw.submit}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Page;
