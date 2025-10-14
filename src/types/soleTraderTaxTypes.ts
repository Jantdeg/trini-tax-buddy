export interface SoleTraderBusinessInfo {
  annualRevenue: number;
  costOfGoodsSold: number;
  operatingExpenses: number;
  employeeWages: number;
  rentExpenses: number;
  utilitiesExpenses: number;
  advertisingExpenses: number;
  vehicleExpenses: number;
  officeSupplies: number;
  professionalFees: number;
  insuranceExpenses: number;
  depreciationExpenses: number;
  otherExpenses: number;
}

export interface SoleTraderEmploymentInfo {
  numberOfEmployees: number;
  annualPayroll: number;
}

export interface SoleTraderRegistrationInfo {
  hasVATRegistration: boolean;
  hasBIRCertificate: boolean;
  businessStartDate: string;
}

export interface SoleTraderTaxFormData {
  businessInfo: SoleTraderBusinessInfo;
  employmentInfo: SoleTraderEmploymentInfo;
  registrationInfo: SoleTraderRegistrationInfo;
}
