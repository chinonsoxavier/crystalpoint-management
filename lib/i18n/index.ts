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
  overview: {
    dashboard: string;
    welcomeBack: string;
    shareLink: string;
    balanceCards: {
      totalDeposit: string;
      profitBalance: string;
      totalWithdrawals: string;
      activeDeposits: string;
      pendingWithdrawals: string;
      promotionalBalance: string;
    };
    transactions: {
      label: string;
      previousTransactions: {
        deposit: string;
        withdrawal: string;
        investments: string;
      };
      depositTableHeader: {
        id: string;
        date: string;
        method: string;
        amount: string;
        status: string;
        pending: string;
        confirmed: string;
        failed: string;
      };
    };
  };
  deposit: {
    infoMessage: string;
    depositMethod: string;
    chooseCrypto: string;
    amount: string;
    minimumDepositMessage: string;
    continueToPayment: string;
    completePayment: string;
    sendExactAmount: string;
    personalDepositAddress: string;
    instructions: string;
    warningMessage: string;
    goBack: string;
    paymentMade: string;
    processing: string;
    depositSuccess: string;
    depositProcessedMessage: string;
    processingTime: string;
    processingTimeMessage: string;
    transactionDetails: string;
    method: string;
    network: string;
    status: string;
    viewTransactionHistory: string;
    makeAnotherDeposit: string;
  };
  invest: {
    pageTitle: string;
    loadingPlans: string;
    minimum: string;
    maximumAmount: string;
    returnOfInvestment: string;
    durationDays: string;
    referralBonus: string;
    welcomeBonus: string;
    selectPackage: string;
    trustBadge: string;
    unlimited: string;
  };
  withdraw: {
    pending: string;
    withdraw: string;
    ledgerBalance: string;
    activeDeposit: string;
    profitBalance: string;
    promoBalance: string;
    withdrawal: string;
    methodOfWithdrawal: string;
    selectWallet: string;
    chooseAccount: string;
    selectAccount: string;
    walletAddress: string;
    amount: string;
    submit: string;
    submitting: string;
    walletType: string;
    ledgerBalanceOption: string;
    profitBalanceOption: string;
    promoBalanceOption: string;
  };
  membership: {
    title: string;
    subtitle: string;
    paymentMethod: string;
    amount: string;
    next: string;
    completeUpgrade: string;
    sendExactly: string;
    depositAddress: string;
    scanWithWallet: string;
    back: string;
    iHaveDeposited: string;
    processing: string;
    depositAlertSuccessful: string;
    depositAlertDescription: string;
    processingTime: string;
    processingTimeDescription: string;
    transactionDetails: string;
    amountLabel: string;
    methodLabel: string;
    networkLabel: string;
    statusLabel: string;
    viewTransactionHistory: string;
    chooseCryptocurrency: string;
  };
  // Add membership types
  gold: {
    title: string;
    subtitle: string;
  };
  silver: {
    title: string;
    subtitle: string;
  };
  premium: {
    title: string;
    subtitle: string;
  };
  transactions: {
    title: string;
    depositTransactions: string;
    investmentLogs: string;
    withdrawalLogs: string;
    confirmed: string;
    pending: string;
    approved: string;
    totalInvestments: string;
    totalProfit: string;
    completedInvestments: string;
    activeInvestments: string;
    investmentName: string;
    startDate: string;
    endDate: string;
    roi: string;
    duration: string;
    status: string;
    active: string;
    inactive: string;
    filterByInvestmentName: string;
    loadingData: string;
    noResults: string;
    page: string;
    of: string;
    previous: string;
    next: string;
    // Deposit specific
    transactionId: string;
    date: string;
    method: string;
    amount: string;
    cancelDeposit: string;
    cancelDepositDescription: string;
    keepDeposit: string;
    yesCancelDeposit: string;
    filterByMethod: string;
    // Withdrawal specific
    withdrawalId: string;
    walletAddress: string;
    transactionHash: string;
    cancelWithdrawal: string;
    cancelWithdrawalDescription: string;
    keepWithdrawal: string;
    yesCancelWithdrawal: string;
    filterByStatus: string;
    user: string;
    wallet: string;
    completed: string;
    failed: string;
    filterByUser: string;
  };
  settings: {
    title: string;
    subtitle: string;
    tabs: {
      profile: string;
      preferences: string;
      security: string;
      account: string;
    };
    profile: {
      accountInformation: string;
      firstName: string;
      lastName: string;
      phone: string;
      country: string;
      dateOfBirth: string;
      selectCountry: string;
      changePassword: string;
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
      enterCurrentPassword: string;
      enterNewPassword: string;
      confirmNewPassword: string;
      updateProfile: string;
      updatePassword: string;
      updating: string;
    };
    preferences: {
      notificationPreferences: string;
      emailNotifications: string;
      emailNotificationsDesc: string;
      smsNotifications: string;
      smsNotificationsDesc: string;
      displayPreferences: string;
      language: string;
      selectLanguage: string;
      currency: string;
      selectCurrency: string;
      savePreferences: string;
      saving: string;
    };
    security: {
      twoFactorAuthentication: string;
      twoFactorAuthenticationDesc: string;
      enabled: string;
      disabled: string;
      twoFactorEnabledDesc: string;
      twoFactorDisabledDesc: string;
    };
    account: {
      deleteAccount: string;
      deleteAccountDesc: string;
      warning: string;
      warningDesc: string;
      warningList: {
        personalInfo: string;
        transactionHistory: string;
        accountSettings: string;
        associatedFunds: string;
      };
      deleteAccountButton: string;
      deleting: string;
      areYouSure: string;
      areYouSureDesc: string;
      typeToDelete: string;
      typeToDeletePlaceholder: string;
      cancel: string;
      deleteAccountConfirm: string;
    };
  };
  support: {
    title: string;
    subtitle: string;
    createTicket: string;
    backToList: string;
    createNewTicket: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    discard: string;
    ticketId: string;
    description: string;
    priority: string;
    status: string;
    noTickets: {
      inProgress: string;
      open: string;
      resolved: string;
      closed: string;
      default: string;
    };
    ticketPriority: {
      low: string;
      medium: string;
      high: string;
      urgent: string;
    };
    ticketStatus: {
      open: string;
      inProgress: string;
      resolved: string;
      closed: string;
    };
  };
  promoModal: {
    title: string;
    subtitle: string;
    selectPlan: string;
    selectVIPPlan: string;
    capitalProtection: string;
    dailyProfit: string;
    instantWithdrawals: string;
    limitedTimeBonus: string;
    actFast: string;
    risk: {
      low: string;
      medium: string;
      high: string;
    };
    plans: {
      accessories: {
        name: string;
        description: string;
      };
      oilAndGas: {
        name: string;
        description: string;
      };
      agriculture: {
        name: string;
        description: string;
      };
      realEstate: {
        name: string;
        description: string;
      };
      vip: {
        name: string;
        description: string;
      };
    };
  };
  dashboard: {
    myWallet: string;
    ledgerBalance: string;
    accountHolder: string;
    menu: {
      dashboard: string;
      deposit: string;
      invest: string;
      withdraw: string;
      membership: string;
      transactions: string;
      tier2: string;
      tier3: string;
      settings: string;
      promotionalBonus: string;
      helpSupport: string;
      logout: string;
    };
    membershipCards: {
      gold: string;
      silver: string;
      premium: string;
    };
    transactions: {
      depositTransactions: string;
      investmentLogs: string;
      withdrawalLogs: string;
    };
    tier2: {
      features: string;
      unlockTier2: string;
      unlockTier2Desc: string;
      upgradeToTier2: string;
    };
    tier3: {
      features: string;
      unlockTier3: string;
      unlockTier3Desc: string;
      upgradeToTier3: string;
    };
    adPrompts: {
      membershipCardId: string;
      activateMembership: string;
      tier2Upgrade: string;
      tier3Upgrade: string;
      securityLevy: string;
      promotionalBonus: string;
      vipUpgrade: string;
      premiumUpgrade: string;
    };
    previousTransactions: {
      title: string;
      deposit: string;
      investments: string;
      withdrawals: string;
    };
  };
   auth: {
    signIn: {
      welcomeBack: string;
      signInToAccount: string;
      username: string;
      password: string;
      forgotPassword: string;
      signIn: string;
      signingIn: string;
      dontHaveAccount: string;
      registerHere: string;
      backToHome: string;
      usernameRequired: string;
      passwordRequired: string;
      passwordMinLength: string;
    },
    signUp: {
      createAccount: string;
      enterDetailsToRegister: string;
      firstName: string;
      lastName: string;
      username: string;
      emailAddress: string;
      country: string;
      phoneNumber: string;
      password: string;
      confirmPassword: string;
      agreeToTerms: string;
      termsAndConditions: string;
      and: string;
      privacyPolicy: string;
      createAccountButton: string;
      creatingAccount: string;
      alreadyHaveAccount: string;
      signInHere: string;
      backToHome: string;
      firstNameRequired: string;
      lastNameRequired: string;
      usernameRequired: string;
      selectCountry: string;
      phoneNumberRequired: string;
      emailRequired: string;
      validEmail: string;
      passwordRequired: string;
      passwordMinLength: string;
      passwordsDoNotMatch: string;
      agreeToTermsRequired: string;
      selectACountry: string;
      searchCountry: string;
      noCountryFound: string;
    },
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
