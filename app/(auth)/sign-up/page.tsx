"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Globe,
  Phone,
  Lock,
  Home,
  Check,
  ChevronsUpDown,
  Search,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import useUserStore from "@/app/user/user_store";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/auth_guard";
import { countries } from "@/components/shared/data/countrie";
import { useTranslate } from "@/hooks/use_translate";

// --- SHADCN IMPORTS FOR COMBOBOX ---
// If you don't have these installed yet, run: npx shadcn@latest add popover command
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// --- 1. COUNTRY COMBOBOX COMPONENT ---
interface CountryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}

const CountryCombobox = ({
  value,
  onChange,
  error,
  disabled,
}: CountryComboboxProps) => {
  const { t } = useTranslate();
  const [open, setOpen] = useState(false);

  const selectedCountry = countries.find((country) => country.code === value);

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between text-left font-normal h-12 bg-background/50",
              !value && "text-muted-foreground",
              error &&
                "border-destructive text-destructive focus:ring-destructive/20"
            )}
          >
            <div className="pl-7">
              {selectedCountry
                ? selectedCountry.name
                : t.admin.auth.signUp.selectACountry}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 border-border/50 bg-card shadow-xl"
          align="start"
        >
          <Command className="bg-transparent">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder={t.admin.auth.signUp.searchCountry}
                className="h-9 border-0 focus:ring-0 focus-visible:ring-0"
              />
            </div>
            <CommandList>
              <CommandEmpty>{t.admin.auth.signUp.noCountryFound}</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.name} // Search by name
                    onSelect={() => {
                      onChange(country.code); // Save by code
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === country.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {country.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Icon positioned absolutely to match other inputs */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Globe className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
};

// --- MAIN FORM COMPONENT ---

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  country: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const Page = () => {
  const { t } = useTranslate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    country: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const router = useRouter();
  const { register, authStatus } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }));

    // Clear error on input
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = t.admin.auth.signUp.firstNameRequired;
    if (!formData.lastName.trim())
      newErrors.lastName = t.admin.auth.signUp.lastNameRequired;
    if (!formData.username.trim())
      newErrors.username = t.admin.auth.signUp.usernameRequired;
    if (!formData.country)
      newErrors.country = t.admin.auth.signUp.selectCountry;
    if (!formData.phone.trim())
      newErrors.phone = t.admin.auth.signUp.phoneNumberRequired;
    if (!formData.email.trim())
      newErrors.email = t.admin.auth.signUp.emailRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t.admin.auth.signUp.validEmail;
    if (!formData.password)
      newErrors.password = t.admin.auth.signUp.passwordRequired;
    if (formData.password.length < 4)
      newErrors.password = t.admin.auth.signUp.passwordMinLength;
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = t.admin.auth.signUp.passwordsDoNotMatch;
    if (!formData.agreeTerms)
      newErrors.agreeTerms = t.admin.auth.signUp.agreeToTermsRequired;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix errors in form");
      return;
    }

    // setIsLoading(true);

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      country: formData.country,
      phone: formData.phone.trim(),
    };

    const res = await register(payload);

    if (res === "success") {
      router.push("/sign-in");
    }

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      country: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    });
    setErrors({});
  };

  return (
    <AuthGuard>
      <div className="w-full py-7 md:py-10 wrapper min-h-screen md:px-6 px-4 flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="w-full max-w-lg">
          {/* Logo and Title Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">CP</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {t.admin.auth.signUp.createAccount}
            </h1>
            <p className="text-muted-foreground">
              {t.admin.auth.signUp.enterDetailsToRegister}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* First Name + Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.admin.auth.signUp.firstName}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className={cn(
                        "w-full pl-10 pr-3 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        errors.firstName &&
                          "border-destructive focus:ring-destructive/20"
                      )}
                      disabled={authStatus === "loading"}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-sm text-destructive">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.admin.auth.signUp.lastName}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className={cn(
                        "w-full pl-10 pr-3 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        errors.lastName &&
                          "border-destructive focus:ring-destructive/20"
                      )}
                      disabled={authStatus === "loading"}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-sm text-destructive">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Username + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.admin.auth.signUp.username}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Choose a username"
                      className={cn(
                        "w-full pl-10 pr-3 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        errors.username &&
                          "border-destructive focus:ring-destructive/20"
                      )}
                      disabled={authStatus === "loading"}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-destructive">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.admin.auth.signUp.emailAddress}
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
                      placeholder="your@email.com"
                      className={cn(
                        "w-full pl-10 pr-3 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        errors.email &&
                          "border-destructive focus:ring-destructive/20"
                      )}
                      disabled={authStatus === "loading"}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Country + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="country"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.admin.auth.signUp.country}
                  </label>

                  {/* REPLACED SELECT WITH COMBOBOX */}
                  <CountryCombobox
                    value={formData.country}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, country: val }))
                    }
                    error={!!errors.country}
                    disabled={authStatus === "loading"}
                  />

                  {errors.country && (
                    <p className="text-sm text-destructive">{errors.country}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.admin.auth.signUp.phoneNumber}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1234567890"
                      className={cn(
                        "w-full pl-10 pr-3 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        errors.phone &&
                          "border-destructive focus:ring-destructive/20"
                      )}
                      disabled={authStatus === "loading"}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.admin.auth.signUp.password}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="•••••••"
                      className={cn(
                        "w-full pl-10 pr-10 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        errors.password &&
                          "border-destructive focus:ring-destructive/20"
                      )}
                      disabled={authStatus === "loading"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={authStatus === "loading"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.admin.auth.signUp.confirmPassword}
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
                      placeholder="•••••••"
                      className={cn(
                        "w-full pl-10 pr-10 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        errors.confirmPassword &&
                          "border-destructive focus:ring-destructive/20"
                      )}
                      disabled={authStatus === "loading"}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={authStatus === "loading"}
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
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-5 h-5 mt-0.5 border-border rounded focus:ring-2 focus:ring-primary/20"
                  disabled={authStatus === "loading"}
                />
                <label htmlFor="agreeTerms" className="text-sm text-foreground">
                  {t.admin.auth.signUp.agreeToTerms}
                  <a
                    href="/terms-of-service"
                    className="text-primary hover:text-primary/80 "
                  >
                    {t.admin.auth.signUp.termsAndConditions}
                  </a>
                  {t.admin.auth.signUp.and}
                  <a
                    href="/privacy-policy"
                    className="text-primary hover:text-primary/80 "
                  >
                    {t.admin.auth.signUp.privacyPolicy}
                  </a>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-sm text-destructive">{errors.agreeTerms}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={authStatus === "loading"}
                className="w-full py-3 rounded-lg font-medium text-white"
              >
                {authStatus === "loading" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    {t.admin.auth.signUp.creatingAccount}
                  </>
                ) : (
                  t.admin.auth.signUp.createAccountButton
                )}
              </Button>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-muted-foreground">
                  {t.admin.auth.signUp.alreadyHaveAccount}{" "}
                  <Link
                    href="/sign-in"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {t.admin.auth.signUp.signInHere}
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Back to Home */}
          <div className="center">
            <Button variant="link" className="mt-8 text-center bg-white ">
              <Link
                href="/"
                className="inline-flex items-center text-sm transition-colors "
              >
                <Home className="h-4 w-4 mr-1" />
                {t.admin.auth.signUp.backToHome}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Page;
