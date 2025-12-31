// app/terms-of-service/page.tsx
"use client";

import { useState } from "react";
import Animate from "@/components/animation/animate";
import { useTranslate } from "@/hooks/use_translate";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HoverArrow from "@/components/ui/hover_arrow";
import { Printer, Share2 } from "lucide-react";
import { TableOfContents } from "@/components/shared/table_of_contents";
import { ExpandableSection } from "@/components/shared/expandable_section";

const Page = () => {
  const { t } = useTranslate();
  const [showToc, setShowToc] = useState(true);

  const tocItems = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "services", title: "Services Description" },
    { id: "accounts", title: "User Accounts" },
    { id: "investmentRisks", title: "Investment Risks" },
    { id: "feesPayments", title: "Fees and Payments" },
    { id: "withdrawalPolicy", title: "Withdrawal Policy" },
    { id: "termination", title: "Termination" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "governingLaw", title: "Governing Law" },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Terms of Service",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 print:py-6 print:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Animate className="text-center mb-12 print:mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">
            {t.landing.termsOfService.title}
          </h1>
          <p className="text-xl text-secondary-foreground mb-2">
            {t.landing.termsOfService.subtitle}
          </p>
          <p className="text-sm text-gray-500">
            {t.landing.termsOfService.lastUpdated}
          </p>
        </Animate>

        {/* Action Buttons */}
        <Animate>
          <div className="flex justify-end gap-2 mb-6 print:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowToc(!showToc)}
            >
              {showToc ? "Hide" : "Show"} Table of Contents
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </Animate>
        <Animate>

          <div className="flex gap-8">
            {/* Table of Contents - Hidden on print */}
            {showToc && (
              <div className="hidden lg:block w-64 print:hidden">
                <TableOfContents items={tocItems} />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 space-y-6">
              {/* Acceptance of Terms */}
              <ExpandableSection
                id="acceptance"
                title={t.landing.termsOfService.sections.acceptance.title}
                defaultExpanded={true}
              >
                <p className="text-gray-700 leading-relaxed">
                  {t.landing.termsOfService.sections.acceptance.content}
                </p>
              </ExpandableSection>

              {/* Services Description */}
              <ExpandableSection
                id="services"
                title={t.landing.termsOfService.sections.services.title}
              >
                <p className="text-gray-700 leading-relaxed">
                  {t.landing.termsOfService.sections.services.content}
                </p>
              </ExpandableSection>

              {/* User Accounts */}
              <ExpandableSection
                id="accounts"
                title={t.landing.termsOfService.sections.accounts.title}
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t.landing.termsOfService.sections.accounts.content}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {t.landing.termsOfService.sections.accounts.list.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </ExpandableSection>

              {/* Investment Risks */}
              <ExpandableSection
                id="investmentRisks"
                title={t.landing.termsOfService.sections.investmentRisks.title}
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t.landing.termsOfService.sections.investmentRisks.content}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {t.landing.termsOfService.sections.investmentRisks.list.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </ExpandableSection>

              {/* Fees and Payments */}
              <ExpandableSection
                id="feesPayments"
                title={t.landing.termsOfService.sections.feesPayments.title}
              >
                <p className="text-gray-700 leading-relaxed">
                  {t.landing.termsOfService.sections.feesPayments.content}
                </p>
              </ExpandableSection>

              {/* Withdrawal Policy */}
              <ExpandableSection
                id="withdrawalPolicy"
                title={t.landing.termsOfService.sections.withdrawalPolicy.title}
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t.landing.termsOfService.sections.withdrawalPolicy.content}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {t.landing.termsOfService.sections.withdrawalPolicy.list.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </ExpandableSection>

              {/* Termination */}
              <ExpandableSection
                id="termination"
                title={t.landing.termsOfService.sections.termination.title}
              >
                <p className="text-gray-700 leading-relaxed">
                  {t.landing.termsOfService.sections.termination.content}
                </p>
              </ExpandableSection>

              {/* Limitation of Liability */}
              <ExpandableSection
                id="liability"
                title={t.landing.termsOfService.sections.liability.title}
              >
                <p className="text-gray-700 leading-relaxed">
                  {t.landing.termsOfService.sections.liability.content}
                </p>
              </ExpandableSection>

              {/* Governing Law */}
              <ExpandableSection
                id="governingLaw"
                title={t.landing.termsOfService.sections.governingLaw.title}
              >
                <p className="text-gray-700 leading-relaxed">
                  {t.landing.termsOfService.sections.governingLaw.content}
                </p>
              </ExpandableSection>
            </div>
          </div>
        </Animate>

        {/* CTA Section */}
        <Animate className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-6">
            If you have any questions about our Terms of Service, please don`t
            hesitate to contact us.
          </p>
          <Link href="/contact-us">
            <Button className="bg-primary text-white">
              Contact Us <HoverArrow />
            </Button>
          </Link>
        </Animate>
      </div>
    </div>
  );
};

export default Page;
