// lib/i18n/index.ts
import { landing as enLanding } from "./en/landing";
import { landing as esLanding } from "./es/landing";
import { landing as frLanding } from "./fr/landing";
import { landing as ptLanding } from "./pt/landing";
import { landing as zhLanding } from "./zh/landing";
import { admin as enAdmin } from "./en/admin";
import { admin as esAdmin } from "./es/admin";
import { admin as frAdmin } from "./fr/admin";
import { admin as ptAdmin } from "./pt/admin";
import { admin as zhAdmin } from "./zh/admin";

export type Language = "en" | "es" | "fr" | "pt" | "zh";

export interface LandingTranslation {
  header: {
    company: string;
    aboutUs: string;
    faqs: string;
    contactUs: string;
    markets: string;
    plans: string;
    services: string;
    login: string;
    signup: string;
    investment: string;
  };
  hero: {
    slides: Array<{
      badge: string;
      linkLabel: string;
      title: {
        before: string;
        highlight: string;
        after: string;
      };
      description: string;
      buttons: {
        login?: string;
        signup?: string;
        services?: string;
      };
    }>;
  };
  learnMoreAboutUs: {
    title: {
      before: string;
      highlight: string;
    };
    subtitle: string;
    cards: {
      aboutUs: {
        label: string;
        desc: string;
      };
      ourServices: {
        label: string;
        desc: string;
      };
      contactUs: {
        label: string;
        desc: string;
      };
    };
    aboutSection: {
      title: string;
      description: string;
      button: string;
    };
  };
  investmentPlans: {
    title: {
      before: string;
      highlight: string;
    };
    plans: {
      beginners: {
        name: string;
        return: string;
        frequency: string;
        duration: string;
        referralBonus: string;
        welcomeBonus: string;
      };
      accessories: {
        name: string;
        return: string;
        frequency: string;
        duration: string;
        referralBonus: string;
        welcomeBonus: string;
      };
      oilGas: {
        name: string;
        return: string;
        frequency: string;
        duration: string;
        referralBonus: string;
        welcomeBonus: string;
      };
      agriculture: {
        name: string;
        return: string;
        frequency: string;
        duration: string;
        referralBonus: string;
        welcomeBonus: string;
      };
      realEstate: {
        name: string;
        return: string;
        frequency: string;
        duration: string;
        referralBonus: string;
        welcomeBonus: string;
      };
    };
  };
  investment: {
    title: {
      before: string;
      highlight: string;
    };
    subtitle: string;
    features: {
      innovative: string;
      // Add other features if needed
    };
    cardSection: {
      title: string;
      description: string;
      button: string;
    };
  };
  stockMarket: {
    title: {
      before: string;
      highlight: string;
    };
    subtitle: string;
    statistics: {
      transactions: {
        value: string;
        label: string;
      };
      activeAccounts: {
        value: string;
        label: string;
      };
      runningDays: {
        value: string;
        label: string;
      };
    };
  };
  clientFundSecurity: {
    title: string;
    subtitle: string;
    features: {
      regulated: string;
      negativeBalance: string;
      financialCommission: string;
      executionQuality: string;
    };
    cta: {
      ready: string;
      login: string;
      createAccount: string;
    };
  };
  faq: {
    title: string;
    subtitle: string;
    items: {
      withdrawalTime: {
        question: string;
        answer: string;
      };
      depositFrequency: {
        question: string;
        answer: string;
      };
      withdrawalProcess: {
        question: string;
        answer: string;
      };
      depositReflection: {
        question: string;
        answer: string;
      };
      multipleAccounts: {
        question: string;
        answer: string;
      };
      depositProcess: {
        question: string;
        answer: string;
      };
    };
    seeMore: string;
  };
  beginTrading: {
    title: string;
    openAccount: string;
    steps: {
      register: {
        title: string;
        description: string;
      };
      deposit: {
        title: string;
        description: string;
      };
      withdraw: {
        title: string;
        description: string;
      };
    };
  };
  popularMarkets: {
    title: {
      before: string;
      highlight: string;
    };
    subtitle: string;
    markets: {
      forex: {
        title: string;
        description: string;
      };
      indices: {
        title: string;
        description: string;
      };
      stocks: {
        title: string;
        description: string;
      };
      metals: {
        title: string;
        description: string;
      };
      energies: {
        title: string;
        description: string;
      };
    };
  };
  investmentProduct: {
    title: {
      before: string;
      highlight: string;
    };
    subtitle: string;
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
  footer: {
    company: {
      title: string;
      aboutUs: string;
      whatWeOffer: string;
      faqs: string;
      contactUs: string;
    };
    services: {
      title: string;
      realEstate: string;
      goldInvestments: string;
      retirementPlanning: string;
    };
    more: {
      title: string;
      oilAndGas: string;
      financialPlanning: string;
      loansAndGrants: string;
      stockInvestment: string;
    };
    account: {
      title: string;
      createAccount: string;
      login: string;
      forgotPassword: string;
    };
    legal: {
      termsOfUse: string;
      privacyPolicy: string;
    };
    copyright: string;
  };
  privacyPolicy: {
    title: string;
    subtitle: string;
    lastUpdated: string;
    sections: {
      introduction: {
        title: string;
        content: string;
      };
      informationWeCollect: {
        title: string;
        content: string;
        subsections: {
          personalInfo: {
            title: string;
            content: string;
          };
          financialInfo: {
            title: string;
            content: string;
          };
          technicalInfo: {
            title: string;
            content: string;
          };
        };
      };
      howWeUseInfo: {
        title: string;
        content: string;
        list: string[];
      };
      infoSharing: {
        title: string;
        content: string;
        list: string[];
      };
      dataSecurity: {
        title: string;
        content: string;
      };
      cookies: {
        title: string;
        content: string;
        list: string[];
      };
      yourRights: {
        title: string;
        content: string;
        list: string[];
      };
      contact: {
        title: string;
        content: string;
      };
    };
  };
  termsOfService: {
    title: string;
    subtitle: string;
    lastUpdated: string;
    sections: {
      acceptance: {
        title: string;
        content: string;
      };
      services: {
        title: string;
        content: string;
      };
      accounts: {
        title: string;
        content: string;
        list: string[];
      };
      investmentRisks: {
        title: string;
        content: string;
        list: string[];
      };
      feesPayments: {
        title: string;
        content: string;
      };
      withdrawalPolicy: {
        title: string;
        content: string;
        list: string[];
      };
      termination: {
        title: string;
        content: string;
      };
      liability: {
        title: string;
        content: string;
      };
      governingLaw: {
        title: string;
        content: string;
      };
    };
  };
  investmentCard: {
    minimum: string;
    maximum: string;
    return: string;
    frequency: string;
    duration: string;
    welcomeBonus: string;
    referralBonus: string;
    support: string;
    getStarted: string;
    unlimited: string;
  };
  aboutUsSection: {
    description: string;
    learnMore: string;
  };
  askQuestionSection: {
    title: string;
    description: string;
    askQuestion: string;
  };
  aboutUsHeader: {
    title: string;
    subtitle: string;
  };
  aboutUs: {
    title: string;
    subtitle: string;
    description: string;
    sections: {
      whoWeAre: {
        title: string;
        content: string;
      };
      history: {
        title: string;
        content: string;
      };
      culture: {
        title: string;
        content: string;
      };
    };
  };
  whyChooseUs: {
    title: string;
    features: {
      legalCompany: {
        title: string;
        description: string;
        cta: string;
      };
      highReliability: {
        title: string;
        description: string;
        cta: string;
      };
      quickWithdrawal: {
        title: string;
        description: string;
        cta: string;
      };
      referralProgram: {
        title: string;
        description: string;
        cta: string;
      };
      support247: {
        title: string;
        description: string;
        cta: string;
      };
      dedicatedServer: {
        title: string;
        description: string;
        cta: string;
      };
      sslSecured: {
        title: string;
        description: string;
        cta: string;
      };
      ddosProtection: {
        title: string;
        description: string;
        cta: string;
      };
    };
  };
  investorsChoice: {
    title: string;
    subtitle: string;
    button: string;
  };
  servicesHeader: {
    title: string;
    subtitle: string;
  };
  sinvestment: {
    title: {
      before: string;
      highlight: string;
      after: string;
    };
    subtitle: string;
    card: {
      title: string;
      description: string;
      button: string;
    };
  };
  services: {
    title: string;
    items: {
      realEstate: {
        label: string;
        description: string;
      };
      goldInvestments: {
        label: string;
        description: string;
      };
      retirementPlanning: {
        label: string;
        description: string;
      };
      financialPlanning: {
        label: string;
        description: string;
      };
      oilAndGas: {
        label: string;
        description: string;
      };
      loansAndGrants: {
        label: string;
        description: string;
      };
      stockInvestment: {
        label: string;
        description: string;
      };
    };
    learnMore: string;
  };
  faqsHeader: {
    title: string;
    subtitle: string;
  };
  contactUsHeader: {
    title: string;
    subtitle: string;
  };
  contactUs: {
    title: string;
    subtitle: string;
    address: string;
    email: string;
    fullName: string;
    emailPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sendMessage: string;
  };
  marketHeader: {
    title: string;
    subtitle: string;
  };
  forexMarket: {
    title: string;
    description: string;
  };
  financialPlanning: {
    title: string;
    description: string;
  };
  pageHeader: {
    services: string;
    financialPlanning: string;
  };
  goldInvestments: {
    title: string;
    history: {
      title: string;
      paragraphs: string[];
    };
    considerations: {
      title: string;
      points: string[];
    };
  };
  loansAndGrants: {
    title: string;
    easyWithCristalPoint: {
      title: string;
      description: string;
    };
  };
  oilAndGas: {
    title: string;
    sections: {
      oilTradingWithCFD: {
        title: string;
        description: string;
      };
      cfdsForInvesting: {
        title: string;
        description: string;
      };
      benefitsOfInvesting: {
        title: string;
        description: string;
      };
      easyWithCristalPoint: {
        title: string;
        description: string;
      };
      speculatingOnline: {
        title: string;
        description: string;
      };
      knowOilMarketWell: {
        title: string;
        description: string;
      };
      simpleExample: {
        title: string;
        description: string;
      };
      chooseTradingPlatform: {
        title: string;
        description: string;
        features: {
          spreads: string;
          leverage: string;
          tools: string;
          quality: string;
        };
      };
      assetWithFuture: {
        title: string;
        description: string;
      };
      investLongTerm: {
        title: string;
        description: string;
      };
      coverLongTermInvestment: {
        title: string;
        description: string;
      };
      tradingIndicators: {
        title: string;
        description: string;
      };
    };
  };
  realEstate: {
    title: string;
    history: {
      title: string;
      description: string;
    };
    hotDeals: {
      title: string;
    };
    makeEnquiry: string;
  };
  retirementPlanning: {
    title: string;
    workforceOptimization: {
      title: string;
      description: string;
    };
    quadrupleRetirement: {
      title: string;
      description: string;
    };
  };
  stockInvestment: {
    title: string;
    tradingStockOrShare: {
      title: string;
      description: string;
    };
    investInStocks: {
      title: string;
      description: string;
      features: {
        createAccount: string;
        choosePlan: string;
        makeDeposit: string;
        getROI: string;
      };
    };
  };
};

export interface AdminTranslation {
  header: {
  greetings: string;
  };
overview:{
  dashboard: string;
  welcomeBack: string;
  shareLink: string;
  balanceCards:{
    totalDeposit: string;
    profitBalance: string;
    totalWithdrawals: string;
    activeDeposits: string;
    pendingWithdrawals: string;
    promotionalBalance: string;
  },
  transactions:{
    label: string;
    previousTransactions:  {
      deposit: string;
      withdrawal: string;
      investments: string;
    };
    depositTableHeader:{
     id: string;
     date: string;
     method: string;
     amount: string;
     status: string;
     pending: string;
      confirmed: string;
      failed: string;

    },
  }
},

  
}

export interface AllTranslations {
  landing: LandingTranslation;
  admin: AdminTranslation;
}

export const translations: Record<Language, AllTranslations> = {
  en: { landing: enLanding, admin: enAdmin },
  es: { landing: esLanding, admin: esAdmin },
  fr: { landing: frLanding,admin: frAdmin },
  pt: { landing: ptLanding ,admin: ptAdmin },
  zh: { landing: zhLanding,admin: zhAdmin },
};

export const languages: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
  zh: "中文",
};
