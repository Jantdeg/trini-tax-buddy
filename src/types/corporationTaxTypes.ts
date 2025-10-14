export interface CorporationFinancials {
  grossSales: number;
  costOfSales: number;
  operatingExpenses: number;
  depreciation: number;
  interestExpenses: number;
  otherIncome: number;
}

export interface CorporationDeductions {
  capitalAllowances: number;
  lossesCarriedForward: number;
  donationsToCharities: number;
  researchAndDevelopment: number;
  trainingExpenses: number;
  environmentalExpenses: number;
}

export interface CorporationDetails {
  isPetrochemical: boolean;
  isManufacturing: boolean;
  isNewBusiness: boolean;
  yearsInOperation: number;
  hasExportSales: boolean;
  exportSalesPercentage: number;
  isSmallBusiness: boolean;
}

export interface CorporationTaxFormData {
  financials: CorporationFinancials;
  deductions: CorporationDeductions;
  details: CorporationDetails;
}
