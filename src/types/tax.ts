export type TaxCategory = "personal" | "sole-trader" | "corporation";

export interface PersonalTaxInput {
  annualIncome: number;
  allowances: number;
  otherDeductions: number;
}

export interface SoleTraderTaxInput {
  annualRevenue: number;
  businessExpenses: number;
  numberOfEmployees: number;
  hasVATRegistration: boolean;
}

export interface CorporationTaxInput {
  grossSales: number;
  allowableDeductions: number;
  isPetrochemical: boolean;
  isNewBusiness: boolean;
  yearsInOperation: number;
}

export interface TaxCalculationResult {
  category: TaxCategory;
  breakdown: {
    label: string;
    amount: number;
    rate?: string;
  }[];
  totalTax: number;
  requiredDocuments: string[];
}
