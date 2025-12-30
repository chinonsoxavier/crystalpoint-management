// app/privacy-policy/page.tsx
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
    { id: "introduction", title: "Introduction" },
    { id: "informationWeCollect", title: "Information We Collect" },
    { id: "howWeUseInfo", title: "How We Use Your Information" },
    { id: "infoSharing", title: "Information Sharing" },
    { id: "dataSecurity", title: "Data Security" },
    { id: "cookies", title: "Cookies" },
    { id: "yourRights", title: "Your Rights" },
    { id: "contact", title: "Contact" },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Privacy Policy",
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
            {t.landing.privacyPolicy.title}
          </h1>
          <p className="text-xl text-secondary-foreground mb-2">
            {t.landing.privacyPolicy.subtitle}
          </p>
          <p className="text-sm text-gray-500">
            {t.landing.privacyPolicy.lastUpdated}
          </p>
        </Animate>

        {/* Action Buttons */}
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

        <div className="flex gap-8">
          {/* Table of Contents - Hidden on print */}
          {showToc && (
            <div className="hidden lg:block w-64 print:hidden">
              <TableOfContents items={tocItems} />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 space-y-6">
            {/* Introduction */}
            <ExpandableSection
              id="introduction"
              title={t.landing.privacyPolicy.sections.introduction.title}
              defaultExpanded={true}
            >
              <p className="text-gray-700 leading-relaxed">
                {t.landing.privacyPolicy.sections.introduction.content}
              </p>
            </ExpandableSection>

            {/* Information We Collect */}
            <ExpandableSection
              id="informationWeCollect"
              title={
                t.landing.privacyPolicy.sections.informationWeCollect.title
              }
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.landing.privacyPolicy.sections.informationWeCollect.content}
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-primary-foreground mb-2">
                    {
                      t.landing.privacyPolicy.sections.informationWeCollect
                        .subsections.personalInfo.title
                    }
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {
                      t.landing.privacyPolicy.sections.informationWeCollect
                        .subsections.personalInfo.content
                    }
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-primary-foreground mb-2">
                    {
                      t.landing.privacyPolicy.sections.informationWeCollect
                        .subsections.financialInfo.title
                    }
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {
                      t.landing.privacyPolicy.sections.informationWeCollect
                        .subsections.financialInfo.content
                    }
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-primary-foreground mb-2">
                    {
                      t.landing.privacyPolicy.sections.informationWeCollect
                        .subsections.technicalInfo.title
                    }
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {
                      t.landing.privacyPolicy.sections.informationWeCollect
                        .subsections.technicalInfo.content
                    }
                  </p>
                </div>
              </div>
            </ExpandableSection>

            {/* How We Use Your Information */}
            <ExpandableSection
              id="howWeUseInfo"
              title={t.landing.privacyPolicy.sections.howWeUseInfo.title}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.landing.privacyPolicy.sections.howWeUseInfo.content}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {t.landing.privacyPolicy.sections.howWeUseInfo.list.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </ExpandableSection>

            {/* Information Sharing */}
            <ExpandableSection
              id="infoSharing"
              title={t.landing.privacyPolicy.sections.infoSharing.title}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.landing.privacyPolicy.sections.infoSharing.content}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {t.landing.privacyPolicy.sections.infoSharing.list.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </ExpandableSection>

            {/* Data Security */}
            <ExpandableSection
              id="dataSecurity"
              title={t.landing.privacyPolicy.sections.dataSecurity.title}
            >
              <p className="text-gray-700 leading-relaxed">
                {t.landing.privacyPolicy.sections.dataSecurity.content}
              </p>
            </ExpandableSection>

            {/* Cookies */}
            <ExpandableSection
              id="cookies"
              title={t.landing.privacyPolicy.sections.cookies.title}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.landing.privacyPolicy.sections.cookies.content}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {t.landing.privacyPolicy.sections.cookies.list.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </ExpandableSection>

            {/* Your Rights */}
            <ExpandableSection
              id="yourRights"
              title={t.landing.privacyPolicy.sections.yourRights.title}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.landing.privacyPolicy.sections.yourRights.content}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {t.landing.privacyPolicy.sections.yourRights.list.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </ExpandableSection>

            {/* Contact */}
            <ExpandableSection
              id="contact"
              title={t.landing.privacyPolicy.sections.contact.title}
            >
              <p className="text-gray-700 leading-relaxed">
                {t.landing.privacyPolicy.sections.contact.content}
              </p>
            </ExpandableSection>
          </div>
        </div>

        {/* CTA Section */}
        <Animate className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-6">
            If you have any questions about our Privacy Policy, please don`t
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
