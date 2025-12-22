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

export function AccountManagement() {
  const { deleteAccount, isDeleteAccountLoading } = useUserStore();
  const [confirmationText, setConfirmationText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">Warning:</p>
                <p className="text-sm text-destructive-foreground">
                  This action cannot be undone. Deleting your account will
                  permanently remove all your data, including:
                </p>
                <ul className="list-disc list-inside text-sm text-destructive-foreground ml-2">
                  <li>Personal information and profile</li>
                  <li>Transaction history</li>
                  <li>Account settings and preferences</li>
                  <li>Any associated funds or assets</li>
                </ul>
              </div>
            </div>
          </div>

          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button disabled={isDeleteAccountLoading} variant="destructive">{isDeleteAccountLoading ? 'DELETING ACOUNT' : 'Delete Account'}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4 space-y-2">
                <Label htmlFor="confirmation">Type DELETE_MY_ACCOUNT to confirm</Label>
                <Input
                  id="confirmation"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  placeholder="TYPE DELETE_MY_ACCOUNT"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={
                    confirmationText !== "DELETE_MY_ACCOUNT" || isDeleteAccountLoading
                  }
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleteAccountLoading ? "Deleting..." : "Delete Account"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
