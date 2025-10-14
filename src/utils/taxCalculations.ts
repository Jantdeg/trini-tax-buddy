import {
  PersonalTaxInput,
  SoleTraderTaxInput,
  CorporationTaxInput,
  TaxCalculationResult,
} from "@/types/tax";

const HEALTH_SURCHARGE_RATE = 0.025; // 2.5%
const BUSINESS_LEVY_RATE = 0.006; // 0.6%
const CORPORATION_TAX_RATE = 0.3; // 30%
const PETROCHEMICAL_TAX_RATE = 0.35; // 35%
const VAT_RATE = 0.125; // 12.5%
const GREEN_FUND_LEVY_RATE = 0.003; // 0.3%

export const calculatePersonalTax = (
  input: PersonalTaxInput
): TaxCalculationResult => {
  const chargeableIncome =
    input.annualIncome - input.allowances - input.otherDeductions;
  
  // Trinidad & Tobago personal income tax rates (simplified)
  let incomeTax = 0;
  if (chargeableIncome <= 1000000) {
    incomeTax = chargeableIncome * 0.25;
  } else {
    incomeTax = 250000 + (chargeableIncome - 1000000) * 0.30;
  }

  const healthSurcharge = input.annualIncome * HEALTH_SURCHARGE_RATE;

  return {
    category: "personal",
    breakdown: [
      {
        label: "Gross Annual Income",
        amount: input.annualIncome,
      },
      {
        label: "Allowances & Deductions",
        amount: -(input.allowances + input.otherDeductions),
      },
      {
        label: "Chargeable Income",
        amount: chargeableIncome,
      },
      {
        label: "Income Tax",
        amount: incomeTax,
        rate: chargeableIncome <= 1000000 ? "25%" : "25% / 30%",
      },
      {
        label: "Health Surcharge",
        amount: healthSurcharge,
        rate: "2.5%",
      },
    ],
    totalTax: incomeTax + healthSurcharge,
    requiredDocuments: [
      "Individual Income Tax Return (Form TD1)",
      "Proof of Income (Pay slips, Employment Contract)",
      "Bank Statements",
      "Receipts for Deductible Expenses",
      "BIR Registration Certificate",
    ],
  };
};

export const calculateSoleTraderTax = (
  input: SoleTraderTaxInput
): TaxCalculationResult => {
  const chargeableIncome = input.annualRevenue - input.businessExpenses;
  
  let incomeTax = 0;
  if (chargeableIncome <= 1000000) {
    incomeTax = chargeableIncome * 0.25;
  } else {
    incomeTax = 250000 + (chargeableIncome - 1000000) * 0.30;
  }

  const businessLevy = input.annualRevenue * BUSINESS_LEVY_RATE;
  const healthSurcharge = input.annualRevenue * HEALTH_SURCHARGE_RATE;
  const vat = input.hasVATRegistration ? input.annualRevenue * VAT_RATE : 0;

  const breakdown = [
    {
      label: "Gross Annual Revenue",
      amount: input.annualRevenue,
    },
    {
      label: "Business Expenses",
      amount: -input.businessExpenses,
    },
    {
      label: "Chargeable Income",
      amount: chargeableIncome,
    },
    {
      label: "Income Tax",
      amount: incomeTax,
      rate: chargeableIncome <= 1000000 ? "25%" : "25% / 30%",
    },
    {
      label: "Business Levy",
      amount: businessLevy,
      rate: "0.6%",
    },
    {
      label: "Health Surcharge",
      amount: healthSurcharge,
      rate: "2.5%",
    },
  ];

  if (input.hasVATRegistration) {
    breakdown.push({
      label: "VAT (Value Added Tax)",
      amount: vat,
      rate: "12.5%",
    });
  }

  return {
    category: "sole-trader",
    breakdown,
    totalTax: incomeTax + businessLevy + healthSurcharge + vat,
    requiredDocuments: [
      "Individual Income Tax Return (Form TD1)",
      "Business Financial Statements",
      "Profit & Loss Statement",
      "Business Registration Certificate",
      "BIR Registration Certificate",
      input.hasVATRegistration ? "VAT Returns" : null,
      input.numberOfEmployees > 0 ? "PAYE Returns" : null,
      input.numberOfEmployees > 0 ? "TD4 Certificates for Employees" : null,
      "Receipts and Invoices",
      "Bank Statements",
    ].filter(Boolean) as string[],
  };
};

export const calculateCorporationTax = (
  input: CorporationTaxInput
): TaxCalculationResult => {
  const chargeableProfit = input.grossSales - input.allowableDeductions;
  
  const taxRate = input.isPetrochemical
    ? PETROCHEMICAL_TAX_RATE
    : CORPORATION_TAX_RATE;
  const corporationTax = chargeableProfit * taxRate;

  const isBusinessLevyExempt =
    input.isNewBusiness && input.yearsInOperation < 3;
  const businessLevy = isBusinessLevyExempt
    ? 0
    : input.grossSales * BUSINESS_LEVY_RATE;

  const greenFundLevy = input.grossSales * GREEN_FUND_LEVY_RATE;
  const healthSurcharge = input.grossSales * HEALTH_SURCHARGE_RATE;

  const breakdown = [
    {
      label: "Gross Sales/Receipts",
      amount: input.grossSales,
    },
    {
      label: "Allowable Deductions",
      amount: -input.allowableDeductions,
    },
    {
      label: "Chargeable Profit",
      amount: chargeableProfit,
    },
    {
      label: "Corporation Tax",
      amount: corporationTax,
      rate: input.isPetrochemical ? "35%" : "30%",
    },
    {
      label: "Business Levy",
      amount: businessLevy,
      rate: isBusinessLevyExempt ? "Exempt (First 3 years)" : "0.6%",
    },
    {
      label: "Green Fund Levy",
      amount: greenFundLevy,
      rate: "0.3%",
    },
    {
      label: "Health Surcharge",
      amount: healthSurcharge,
      rate: "2.5%",
    },
  ];

  return {
    category: "corporation",
    breakdown,
    totalTax: corporationTax + businessLevy + greenFundLevy + healthSurcharge,
    requiredDocuments: [
      "Corporation Tax Return",
      "Audited Financial Statements",
      "Balance Sheet",
      "Profit & Loss Account",
      "Certificate of Incorporation",
      "BIR Registration Certificate",
      "Business Levy Return",
      "Green Fund Levy Return",
      "Health Surcharge Returns",
      "VAT Returns (if applicable)",
      "Supporting Documentation for Deductions",
    ],
  };
};
