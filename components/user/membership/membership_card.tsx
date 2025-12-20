"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Lock, TrendingUp, Crown, Zap, Star } from "lucide-react";
import useMembershipStore from "@/app/user/membership/_membership_store";
const tierIcons = [Crown, Zap, Star];
const tierColors = ["text-amber-500", "text-blue-500", "text-purple-500"];

export function MembershipCards() {
  const {
    membershipCards,
    loading,
    getMembershipCards,
    activateMembership,
  } = useMembershipStore();

  useEffect(() => {
    if (membershipCards.length === 0) {
      getMembershipCards();
    }
  }, [membershipCards.length, getMembershipCards]);


  const handleActivate = async (cardId: string) => {
    await activateMembership(cardId); 
  };

  if (loading.cards) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 w-32 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Available Membership Cards
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose a membership tier that fits your needs
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {membershipCards.map((card, index) => {
          const Icon = tierIcons[index % tierIcons.length];
          const colorClass = tierColors[index % tierColors.length];

          return (
            <Card
              key={card._id}
              className={`relative overflow-hidden ${
                card.currentTier === card.tier
                  ? "border-primary ring-2 ring-primary/20"
                  : ""
              }`}
            >
              <div
                className={`absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 opacity-5`}
              >
                <Icon className="h-full w-full" />
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-muted ${colorClass}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{card.name}</CardTitle>
                      <CardDescription>Tier {card.tier}</CardDescription>
                    </div>
                  </div>
                  {card.currentTier === card.tier && (
                    <Badge variant="default">Active</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      ${card.requiredDeposit.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      required deposit
                    </span>
                  </div>

                  {!card.isEligible && (
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        $
                        {(
                          card.requiredDeposit - card.userTotalDeposit
                        ).toLocaleString()}{" "}
                        more needed
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Benefits:
                  </p>
                  <ul className="space-y-2">
                    {card.benefits.slice(0, 3).map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  {card.benefits.length > 3 && (
                    <p className="text-xs text-muted-foreground">
                      +{card.benefits.length - 3} more benefits
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => handleActivate(card._id)}
                  disabled={
                    !card.isEligible ||
                    card.currentTier === card.tier ||
                    loading.activating
                  }
                  className="w-full"
                  variant={
                    card.currentTier === card.tier ? "outline" : "default"
                  }
                >
                  {loading.activating ? (
                    "Activating..."
                  ) : card.currentTier === card.tier ? (
                    "Current Plan"
                  ) : !card.isEligible ? (
                    <span className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Not Eligible
                    </span>
                  ) : (
                    "Activate"
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
