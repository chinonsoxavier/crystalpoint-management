"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LedgerBalance from "@/components/shared/ledger_balance";
import useMembershipStore from "../_membership_store";
import {
  CheckCircle,
  Loader2,
  Wallet,
  DollarSign,
  Shield,
  Star,
  Crown,
  ArrowRight,
  Clock,
  AlertTriangle,
} from "lucide-react";

const Page = () => {
  const { getMembershipCards, membershipCards, activateMembership, loading ,isActivated,setIsActivated} =
    useMembershipStore();

  const [activationError, setActivationError] = useState<string | null>(null);

  useEffect(() => {
    getMembershipCards();
  }, [getMembershipCards]);

  const selectedCard = useMemo(() => {
    return (
      membershipCards.find(
        (m) => m.name.toLowerCase() === "gold member".toLowerCase()
      ) || null
    );
  }, [membershipCards]);

  const membershipFee = selectedCard?.requiredDeposit || 500;

  const handleActivateFromBalance = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCard) {
      setActivationError("Membership card not found.");
      return;
    }

    setActivationError(null);

      await activateMembership(selectedCard._id);
  };

  const handleReset = () => {
    setIsActivated(false);
    setActivationError(null);
  };

  return (
    <div className="bg-accent min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Investor’s Gold Membership Card Request
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Gold Card Preview */}
          <Card className="overflow-hidden shadow-2xl border-amber-600/20">
            <div className="relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-800 p-8">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,.2)_25%,rgba(255,255,255,.2)_50%,transparent_50%,rgba(255,255,255,.2)_75%,rgba(255,255,255,.2)_100%)] bg-[length:40px_40px]" />

              <div className="relative z-10 text-white text-center space-y-6">
                <div className="flex justify-center items-center gap-6">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 bg-white rounded-full shadow-2xl flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L12 14z" />
                      </svg>
                    </div>
                    <div className="absolute -left-3 top-6 w-8 h-10 bg-blue-600 rounded-l-lg" />
                    <div className="absolute -right-3 top-6 w-8 h-10 bg-blue-700 rounded-r-lg" />
                  </div>

                  <div>
                    <h2 className="text-4xl font-extrabold tracking-wider">
                      CRISTALPOINT
                    </h2>
                    <h3 className="text-3xl font-bold tracking-wide">
                      MEMBERSHIP
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-3xl font-bold tracking-widest">
                    INVESTOR’S MEMBERSHIP
                  </p>
                  <p className="text-3xl font-bold tracking-widest">CARD</p>
                  <Badge
                    variant="secondary"
                    className="mt-4 text-lg px-6 py-2 bg-white/20"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    GOLD MEMBER
                  </Badge>
                </div>
              </div>
            </div>

            <CardContent className="space-y-6">
           

              <Separator />

              <div className="text-center">
                <p className="text-lg font-semibold">Activation Fee</p>
                <p className="text-3xl font-bold text-amber-600">
                  ${membershipFee}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Deducted from your account balance
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right: Activation Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Crown className="w-8 h-8 text-amber-600" />
                Activate Gold Membership
              </CardTitle>
              <CardDescription>
                Instantly activate by deducting{" "}
                <strong>${membershipFee}</strong> from your balance.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {!isActivated ? (
                <>
                  <div className="space-y-4">
                    {/* Current Balance */}
                    <div className="bg-muted/50 rounded-lg p-4 border">
                      <p className="text-sm text-muted-foreground mb-2">
                        Current Balance
                      </p>
                      <div className="text-2xl font-bold">
                        <LedgerBalance />
                      </div>
                    </div>

                    {/* Info Alert */}
                    <Alert className="border-blue-200 bg-blue-50">
                      <Wallet className="h-5 w-5 text-blue-700" />
                      <AlertTitle>Internal Payment</AlertTitle>
                      <AlertDescription>
                        The fee will be automatically deducted from your account
                        balance. No external deposit or wallet needed.
                      </AlertDescription>
                    </Alert>

                    {/* Error Alert */}
                    {activationError && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-5 w-5" />
                        <AlertTitle>Activation Failed</AlertTitle>
                        <AlertDescription>{activationError}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <form onSubmit={handleActivateFromBalance}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-lg font-semibold"
                      disabled={
                        loading.activating || !selectedCard
                      }
                    >
                      {loading.activating ? (
                        <>
                          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          Activating Membership...
                        </>
                      ) : (
                        <>
                          Activate Gold Membership
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-12 space-y-8">
                  <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">
                      Gold Membership Activated!
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                      Congratulations! ${membershipFee} has been deducted from
                      your balance. Your Investor’s Gold Card is now active.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-xl text-left max-w-md mx-auto">
                    <div className="flex items-start gap-3">
                      <Clock className="w-6 h-6 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold">Activation Complete</p>
                        <p className="text-sm text-muted-foreground">
                          Enjoy your exclusive Gold Member benefits and
                          privileges.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => (window.location.href = "/user/dashboard")}
                      className="flex-1"
                    >
                      Go to Dashboard
                    </Button>
                    <Button size="lg" onClick={handleReset} className="flex-1">
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
