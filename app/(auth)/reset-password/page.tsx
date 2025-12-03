"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, Home, CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { AuthGuard } from "@/components/auth_guard";
import useUserStore from "@/app/user/user_store";
import { useRouter } from "next/navigation";

const Page = () => {
  const [step, setStep] = useState<"email" | "reset">("email");
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
   const {resetPassword,authStatus} = useUserStore()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));

    // Clear error on input
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateEmailStep = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetStep = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.newPassword)
      newErrors.newPassword = "New password is required";
    if (formData.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateEmailStep()) return;

  const res = await resetPassword(formData.email);
  if(res === 'success'){
    router.push("/sign-in");
  }
};

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateResetStep()) return;

    setIsLoading(true);

   

  };

  return (
    <AuthGuard>
      <div className="w-full wrapper min-h-screen md:px-6 px-4 flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="w-full max-w-md">
          {/* Logo and Title Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
              <span className="text-2xl font-bold text-primary-foreground">
                CP
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {step === "email" ? "Reset Password" : "Create New Password"}
            </h1>
            <p className="text-muted-foreground">
              {step === "email"
                ? "Enter your email to receive a reset link"
                : "Enter your new password below"}
            </p>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm text-green-500">
                Password reset successfully! Redirecting to login...
              </p>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50 overflow-hidden">
            {step === "email" ? (
              <form onSubmit={handleEmailSubmit} className="p-8 space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={cn(
                        "w-full pl-10 pr-3 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        errors.email &&
                          "border-destructive focus:ring-destructive/20"
                      )}
                      disabled={authStatus==='loading'}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={authStatus==='loading'}
                  className="w-full py-3 rounded-lg font-medium"
                >
                  {authStatus==='loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending Reset Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>

                {/* Back to Login */}
                <div className="text-center">
                  <Link
                    href="/sign-in"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Back to login
                  </Link>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetSubmit} className="p-8 space-y-6">
                {/* New Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter your new password"
                      className={cn(
                        "w-full pl-10 pr-10 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        errors.newPassword &&
                          "border-destructive focus:ring-destructive/20"
                      )}
                      disabled={authStatus==='loading'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={authStatus==='loading'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-sm text-destructive">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your new password"
                      className={cn(
                        "w-full pl-10 pr-10 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        errors.confirmPassword &&
                          "border-destructive focus:ring-destructive/20"
                      )}
                      disabled={authStatus==='loading'}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={authStatus==='loading'}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={authStatus==='loading' || isSuccess}
                  className="w-full py-3 rounded-lg font-medium"
                >
                  {authStatus==='loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>

                {/* Back to Login */}
                <div className="text-center">
                  <Link
                    href="/sign-in"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Back to login
                  </Link>
                </div>
              </form>
            )}
          </div>

          {/* Back to Home */}
          <div className="center">
            <Button variant="link" className="mt-8 text-center ">
              <Link
                href="/"
                className="inline-flex items-center text-sm transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Page;
