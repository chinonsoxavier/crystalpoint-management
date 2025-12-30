// components/landing/home/faq.tsx
"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faPlay } from "@fortawesome/free-solid-svg-icons";
import Animate from "@/components/animation/animate";
import { useTranslate } from "@/hooks/use_translate";

interface FAQProps {
  showButton?: boolean;
}
export default function FAQ({ showButton }: FAQProps) {
  const { t } = useTranslate();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["1"])); // Start with first item open

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const faqItems = [
    {
      id: "1",
      question: t.landing.faq.items.withdrawalTime.question,
      answer: t.landing.faq.items.withdrawalTime.answer,
    },
    {
      id: "2",
      question: t.landing.faq.items.depositFrequency.question,
      answer: t.landing.faq.items.depositFrequency.answer,
    },
    {
      id: "3",
      question: t.landing.faq.items.withdrawalProcess.question,
      answer: t.landing.faq.items.withdrawalProcess.answer,
    },
    {
      id: "4",
      question: t.landing.faq.items.depositReflection.question,
      answer: t.landing.faq.items.depositReflection.answer,
    },
    {
      id: "5",
      question: t.landing.faq.items.multipleAccounts.question,
      answer: t.landing.faq.items.multipleAccounts.answer,
    },
    {
      id: "6",
      question: t.landing.faq.items.depositProcess.question,
      answer: t.landing.faq.items.depositProcess.answer,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Animate className="text-center mb-12">
          <p className="text-secondary-foreground text-xl mb-2">FAQ`s</p>
          <h1 className="md:text-[42px] text-3xl font-bold text-primary-foreground">
            {t.landing.faq.title}
          </h1>
        </Animate>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 medium:grid-cols-2 gap-6 mb-8">
          {faqItems.map((item) => (
            <Animate key={item.id} className="flex flex-col">
              {/* Question Button */}
              <button
                onClick={() => toggleExpanded(item.id)}
                className={`w-full text-left px-6 py-4 rounded-lg font-semibold transition-all ${
                  expandedIds.has(item.id)
                    ? "bg-primary text-white"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faPlay}
                    className={`w-5 h-5 duration-500 shrink-0 ${
                      expandedIds.has(item.id) ? "rotate-90" : ""
                    }`}
                  />
                  <span
                    className={`text-primary-foreground} ${
                      expandedIds.has(item.id)
                        ? "text-white"
                        : "text-primary-foreground "
                    }`}
                  >
                    {item.question}
                  </span>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`bg-white px-6 duration-500 text-secondary-foreground leading-relaxed overflow-hidden ${
                  !expandedIds.has(item.id) ? "h-0 py-0" : "py-4"
                }`}
              >
                {item.answer}
              </div>
            </Animate>
          ))}
        </div>

        {/* See More Button */}
        {showButton && (
          <Animate className="flex justify-center py-10">
            <button className="bg-[#bedbfa] cursor-pointer text-[#1980ec] hover:underline font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
              {t.landing.faq.seeMore}
              <FontAwesomeIcon
                icon={faArrowCircleDown}
                className="w-4 -rotate-90 h-4"
              />
            </button>
          </Animate>
        )}
      </div>
    </div>
  );
}
