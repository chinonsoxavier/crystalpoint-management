"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, Home } from "lucide-react";
import Link from "next/link";

const Page=()=> {
  const [step, setStep] = useState<"email" | "reset">("email");
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmailStep = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetStep = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.newPassword)
      newErrors.newPassword = "New password is required";
    if (formData.newPassword.length < 4)
      newErrors.newPassword = "Password must be at least 4 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmailStep()) return;

    setIsLoading(true);

  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateResetStep()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword,
        }),
      });

      if (response.ok) {
        alert("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        const data = await response.json();
        alert(data.error || "Password reset failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper min-h-screen md:px-6 px-4">
      <div className="w-full mx-auto max-w-2xl bg-white my-10 rounded-md shadow">
        {/* Header Section */}
        <div className="bg-white rounded-t-lg p-8 border-b border-gray-200">
          <div className="mb-4 pb-4 border-b-4 border-blue-900 inline-block">
            <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          </div>
          <p className="text-gray-700 text-lg mb-6">
            {step === "email"
              ? "Enter your email to reset your password"
              : "Create your new password"}
          </p>
          <Link href="/">
            <Button className="bg-primary hover:bg-orange-400 text-white font-bold px-6 py-2 rounded">
              <Home className="mr-2 h-4 w-4" />
              GO BACK HOME
            </Button>
          </Link>
        </div>

        {/* Form Section */}
        {step === "email" ? (
          <form
            onSubmit={handleEmailSubmit}
            className="bg-white rounded-b-lg p-8 space-y-6"
          >
            {/* Email Address */}
            <div>
              <label className="block text-gray-900 font-bold mb-2">
                E-mail Address*
              </label>
              <div className="flex border border-gray-300 rounded overflow-hidden">
                <div className="bg-primary text-white p-3 flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 outline-none text-gray-900"
                />
              </div>
              {errors.email && (
                <p className="text-primary text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-orange-400 text-white font-bold py-3 rounded"
            >
              {isLoading ? "PROCESSING..." : "SEND RESET LINK"}
            </Button>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                href="/sign-in"
                className="text-primary font-semibold text-sm"
              >
                Back to login
              </Link>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleResetSubmit}
            className="bg-white rounded-b-lg p-8 space-y-6"
          >
            {/* New Password */}
            <div>
              <label className="block text-gray-900 font-bold mb-2">
                NEW PASSWORD*
              </label>
              <div className="flex border border-gray-300 rounded overflow-hidden">
                <div className="bg-primary text-white p-3 flex items-center justify-center">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="flex-1 px-4 py-2 outline-none text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-gray-900 font-bold mb-2">
                CONFIRM NEW PASSWORD*
              </label>
              <div className="flex border border-gray-300 rounded overflow-hidden">
                <div className="bg-primary text-white p-3 flex items-center justify-center">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="flex-1 px-4 py-2 outline-none text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Reset Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded"
            >
              {isLoading ? "RESETTING..." : "RESET PASSWORD"}
            </Button>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                href="/signin"
                className="text-primary font-semibold text-sm"
              >
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


export default Page;