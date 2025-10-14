export interface PersonalAllowances {
  personalAllowance: number;
  spouseAllowance: number;
  dependentChildren: number;
  dependentChildrenAmount: number;
  tertiaryEducation: number;
  tertiaryEducationAmount: number;
  lifeInsurance: number;
  healthInsurance: number;
  mortgageInterest: number;
}

export interface PersonalDeductions {
  approvedPension: number;
  nationalInsurance: number;
  educationExpenses: number;
  medicalExpenses: number;
  charitableDonations: number;
}

export interface PersonalTaxFormData {
  annualIncome: number;
  allowances: PersonalAllowances;
  deductions: PersonalDeductions;
}
