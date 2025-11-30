"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faPlay } from "@fortawesome/free-solid-svg-icons";
import Animate from "@/components/animation/animate";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "How long does it take to process my withdrawal?",
    answer:
      "Once we receive your withdrawal request we process immediately and send to your provided wallet address",
  },
  {
    id: "2",
    question: "how many times can i make a deposit?",
    answer:
      "You are allowed to make a deposit as much as you want on all our investment plans.",
  },
  {
    id: "3",
    question: "How do I make a withdrawal?",
    answer:
      "To make a withdrawal request click the WITHDRAW button at the top center of your account dashboard and input the required details to withdraw",
  },
  {
    id: "4",
    question:
      "How long does my deposit take before it can reflect on my investments account dashboard?",
    answer:
      "Your deposit will be reflected immediately once it is confirmed on the blockchain network",
  },
  {
    id: "5",
    question: "Can I have more than two accounts?",
    answer: "We do not allow multiple accounts",
  },
  {
    id: "6",
    question: "How do I make a deposit?",
    answer:
      "To deposit funds in your trading account is quick and simple For your convenience you may choose one of the several available deposit methods To make a successful deposit please follow the steps below Login to your account Click on the DEPOSITS button in the DASHBOARD section Choose the deposit option And follow the steps to complete your transaction",
  },
];

interface FAQProps {showButton?: boolean;}
export default function FAQ({showButton}: FAQProps) {
  // Change state to track multiple expanded IDs
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Animate className="text-center mb-12">
          <p className="text-secondary-foreground text-xl mb-2">FAQ`s</p>
          <h1 className="md:text-[42px] text-3xl font-bold text-primary-foreground">
            Frequently Asked Questions
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
                  expandedIds.has(item.id) ? "bg-primary" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faPlay}
                    className={`w-5 h-5 duration-500 shrink-0 ${
                      expandedIds.has(item.id) ? "rotate-90" : ""
                    }`}
                  />
                  <span className="text-primary-foreground">
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
        {
          showButton &&
        
        <Animate className="flex justify-center py-10">
          <button className="bg-[#bedbfa] cursor-pointer text-[#1980ec] hover:underline font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
            See more FAQs
            <FontAwesomeIcon
              icon={faArrowCircleDown}
              className="w-4 -rotate-90 h-4"
            />
          </button>
        </Animate>
        }
      </div>
    </div>
  );
}
