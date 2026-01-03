// components/settings/AccountManagement.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, AlertTriangle } from "lucide-react";
import useUserStore from "@/app/user/user_store";
import { useTranslate } from "@/hooks/use_translate";

export function AccountManagement() {
  const { deleteAccount, isDeleteAccountLoading } = useUserStore();
  const [confirmationText, setConfirmationText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslate();

  const handleDeleteAccount = () => {
    if (confirmationText === "DELETE_MY_ACCOUNT") {
      deleteAccount(confirmationText);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            {t.admin.settings.account.deleteAccount}
          </CardTitle>
          <CardDescription>
            {t.admin.settings.account.deleteAccountDesc}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">
                  {t.admin.settings.account.warning}
                </p>
                <p className="text-sm text-destructive-foreground">
                  {t.admin.settings.account.warningDesc}
                </p>
                <ul className="list-disc list-inside text-sm text-destructive-foreground ml-2">
                  <li>{t.admin.settings.account.warningList.personalInfo}</li>
                  <li>
                    {t.admin.settings.account.warningList.transactionHistory}
                  </li>
                  <li>
                    {t.admin.settings.account.warningList.accountSettings}
                  </li>
                  <li>
                    {t.admin.settings.account.warningList.associatedFunds}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button disabled={isDeleteAccountLoading} variant="destructive">
                {isDeleteAccountLoading
                  ? t.admin.settings.account.deleting
                  : t.admin.settings.account.deleteAccountButton}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t.admin.settings.account.areYouSure}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t.admin.settings.account.areYouSureDesc}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4 space-y-2">
                <Label htmlFor="confirmation">
                  {t.admin.settings.account.typeToDelete}
                </Label>
                <Input
                  id="confirmation"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  placeholder={t.admin.settings.account.typeToDeletePlaceholder}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {t.admin.settings.account.cancel}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={
                    confirmationText !== "DELETE_MY_ACCOUNT" ||
                    isDeleteAccountLoading
                  }
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleteAccountLoading
                    ? "Deleting..."
                    : t.admin.settings.account.deleteAccountConfirm}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
