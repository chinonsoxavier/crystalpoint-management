// components/landing/contact/contact_form.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Animate from "@/components/animation/animate";
import { useTranslate } from "@/hooks/use_translate";

export default function ContactForm() {
  const { t } = useTranslate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      {/* Contact Info Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max_width py-12">
          <div className="flex flex-col items-center md:flex-row md:justify-center gap-15 md:gap-25">
            {/* Address */}
            <Animate className="center flex-col">
              <div className="flex items-center justify-center gap-4">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="w-6 h-6 text-primary-foreground shrink-0"
                />
                <h3 className="font-semibold text-primary-foreground">
                  {t.landing.contactUs.address}
                </h3>
              </div>
              <div>
                <p className="text-secondary-foreground">United States.</p>
              </div>
            </Animate>

            {/* Email */}
            <Animate className="center flex-col">
              <div className="flex items-center justify-center gap-4">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="w-6 h-6 text-primary-foreground shrink-0"
                />
                <h3 className="font-semibold text-primary-foreground">
                  {t.landing.contactUs.email}
                </h3>
              </div>
              <div>
                <p className="text-secondary-foreground">
                  cristalpointmanagement@gmail.com
                </p>
              </div>
            </Animate>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <main className="max_width py-6 md:py-14">
        {/* Header */}
        <Animate className="text-center mb-12">
          <p className="text-secondary-foreground text-lg md:text-xl">
            {t.landing.contactUs.subtitle}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-8">
            Let&apos;s{" "}
            <span className="underline">{t.landing.contactUs.title}</span>
          </h1>
        </Animate>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
          {/* Three Column Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Full Name */}
            <Animate className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t.landing.contactUs.fullName}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              />
              <FontAwesomeIcon
                className="absolute left-3 top-3.5 w-5 h-5 text-secondary-foreground"
                icon={faUser}
              />
            </Animate>

            {/* Email */}
            <Animate className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.landing.contactUs.emailPlaceholder}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
              />
            </Animate>

            {/* Subject */}
            <Animate className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t.landing.contactUs.subject}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
              />
            </Animate>
          </div>

          {/* Message Textarea */}
          <Animate>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t.landing.contactUs.messagePlaceholder}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
              required
            ></textarea>
          </Animate>

          {/* Submit Button */}
          <Animate>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors duration-200"
            >
              {t.landing.contactUs.sendMessage}
            </button>
          </Animate>
        </form>
      </main>
    </div>
  );
}
