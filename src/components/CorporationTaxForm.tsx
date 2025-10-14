import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CorporationTaxInput } from "@/types/tax";
import { CorporationTaxFormData } from "@/types/corporationTaxTypes";
import { ArrowRight, ArrowLeft, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CorporationTaxFormProps {
  onCalculate: (input: CorporationTaxInput) => void;
}

export const CorporationTaxForm = ({ onCalculate }: CorporationTaxFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CorporationTaxFormData>({
    financials: {
      grossSales: 0,
      costOfSales: 0,
      operatingExpenses: 0,
      depreciation: 0,
      interestExpenses: 0,
      otherIncome: 0,
    },
    deductions: {
      capitalAllowances: 0,
      lossesCarriedForward: 0,
      donationsToCharities: 0,
      researchAndDevelopment: 0,
      trainingExpenses: 0,
      environmentalExpenses: 0,
    },
    details: {
      isPetrochemical: false,
      isManufacturing: false,
      isNewBusiness: false,
      yearsInOperation: 0,
      hasExportSales: false,
      exportSalesPercentage: 0,
      isSmallBusiness: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalDeductions = 
      formData.financials.costOfSales +
      formData.financials.operatingExpenses +
      formData.financials.depreciation +
      formData.financials.interestExpenses +
      formData.deductions.capitalAllowances +
      formData.deductions.lossesCarriedForward +
      formData.deductions.donationsToCharities +
      formData.deductions.researchAndDevelopment +
      formData.deductions.trainingExpenses +
      formData.deductions.environmentalExpenses;

    const netIncome = formData.financials.grossSales + formData.financials.otherIncome;

    onCalculate({
      grossSales: netIncome,
      allowableDeductions: totalDeductions,
      isPetrochemical: formData.details.isPetrochemical,
      isNewBusiness: formData.details.isNewBusiness,
      yearsInOperation: formData.details.yearsInOperation,
    });
  };

  const InfoTooltip = ({ content }: { content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-muted-foreground inline-block ml-1 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: Financial Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Financial Information</CardTitle>
            <CardDescription>
              Enter your company's financial data for the tax year
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="grossSales" className="flex items-center">
                Gross Sales/Revenue (TT$)
                <InfoTooltip content="Total revenue from all business activities before any deductions" />
              </Label>
              <Input
                id="grossSales"
                type="number"
                placeholder="0.00"
                step="0.01"
                required
                value={formData.financials.grossSales || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    financials: {
                      ...formData.financials,
                      grossSales: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="costOfSales" className="flex items-center">
                Cost of Sales (TT$)
                <InfoTooltip content="Direct costs attributable to production: raw materials, direct labor, manufacturing overhead" />
              </Label>
              <Input
                id="costOfSales"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.financials.costOfSales || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    financials: {
                      ...formData.financials,
                      costOfSales: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="operatingExpenses" className="flex items-center">
                Operating Expenses (TT$)
                <InfoTooltip content="Administrative costs, salaries, rent, utilities, marketing, and general business expenses" />
              </Label>
              <Input
                id="operatingExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.financials.operatingExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    financials: {
                      ...formData.financials,
                      operatingExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="depreciation" className="flex items-center">
                Depreciation (TT$)
                <InfoTooltip content="Annual depreciation of company assets: buildings, equipment, vehicles, and machinery" />
              </Label>
              <Input
                id="depreciation"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.financials.depreciation || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    financials: {
                      ...formData.financials,
                      depreciation: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestExpenses" className="flex items-center">
                Interest Expenses (TT$)
                <InfoTooltip content="Interest paid on business loans, credit facilities, and debt obligations" />
              </Label>
              <Input
                id="interestExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.financials.interestExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    financials: {
                      ...formData.financials,
                      interestExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherIncome" className="flex items-center">
                Other Income (TT$)
                <InfoTooltip content="Investment income, gains from asset sales, and other non-operating income" />
              </Label>
              <Input
                id="otherIncome"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.financials.otherIncome || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    financials: {
                      ...formData.financials,
                      otherIncome: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <Button 
              type="button" 
              onClick={() => setStep(2)} 
              className="w-full"
              size="lg"
              disabled={!formData.financials.grossSales}
            >
              Next: Deductions <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Deductions & Allowances */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Deductions & Allowances</CardTitle>
            <CardDescription>
              Enter allowable deductions to reduce taxable income
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="capitalAllowances" className="flex items-center">
                Capital Allowances (TT$)
                <InfoTooltip content="Tax depreciation on qualifying capital assets and equipment" />
              </Label>
              <Input
                id="capitalAllowances"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.deductions.capitalAllowances || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductions: {
                      ...formData.deductions,
                      capitalAllowances: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lossesCarriedForward" className="flex items-center">
                Losses Carried Forward (TT$)
                <InfoTooltip content="Accumulated losses from previous tax years that can offset current income" />
              </Label>
              <Input
                id="lossesCarriedForward"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.deductions.lossesCarriedForward || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductions: {
                      ...formData.deductions,
                      lossesCarriedForward: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="donationsToCharities" className="flex items-center">
                Charitable Donations (TT$)
                <InfoTooltip content="Donations to approved charitable organizations (maximum 15% of assessable income)" />
              </Label>
              <Input
                id="donationsToCharities"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.deductions.donationsToCharities || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductions: {
                      ...formData.deductions,
                      donationsToCharities: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="researchAndDevelopment" className="flex items-center">
                Research & Development (TT$)
                <InfoTooltip content="Qualifying R&D expenses for innovation and product development (150% tax deduction)" />
              </Label>
              <Input
                id="researchAndDevelopment"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.deductions.researchAndDevelopment || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductions: {
                      ...formData.deductions,
                      researchAndDevelopment: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trainingExpenses" className="flex items-center">
                Employee Training (TT$)
                <InfoTooltip content="Costs for approved employee training and development programs" />
              </Label>
              <Input
                id="trainingExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.deductions.trainingExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductions: {
                      ...formData.deductions,
                      trainingExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="environmentalExpenses" className="flex items-center">
                Environmental Protection (TT$)
                <InfoTooltip content="Expenses for environmental conservation and pollution control measures" />
              </Label>
              <Input
                id="environmentalExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.deductions.environmentalExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductions: {
                      ...formData.deductions,
                      environmentalExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                onClick={() => setStep(1)} 
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                type="button" 
                onClick={() => setStep(3)} 
                className="flex-1"
                size="lg"
              >
                Next: Company Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Company Details */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Company Details</CardTitle>
            <CardDescription>
              Business classification and operational information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-1 flex-1">
                  <Label htmlFor="isPetrochemical" className="flex items-center">
                    Petrochemical Company
                    <InfoTooltip content="Oil, gas, and petrochemical companies subject to 35% corporation tax" />
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Is this a petrochemical business?
                  </p>
                </div>
                <Switch
                  id="isPetrochemical"
                  checked={formData.details.isPetrochemical}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      details: {
                        ...formData.details,
                        isPetrochemical: checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-1 flex-1">
                  <Label htmlFor="isManufacturing" className="flex items-center">
                    Manufacturing Company
                    <InfoTooltip content="Manufacturing businesses may qualify for tax incentives" />
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Is this a manufacturing business?
                  </p>
                </div>
                <Switch
                  id="isManufacturing"
                  checked={formData.details.isManufacturing}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      details: {
                        ...formData.details,
                        isManufacturing: checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-1 flex-1">
                  <Label htmlFor="isNewBusiness" className="flex items-center">
                    New Business
                    <InfoTooltip content="Businesses in first 5 years may qualify for tax holidays or reduced rates" />
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Is this a new business (within 5 years)?
                  </p>
                </div>
                <Switch
                  id="isNewBusiness"
                  checked={formData.details.isNewBusiness}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      details: {
                        ...formData.details,
                        isNewBusiness: checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsInOperation" className="flex items-center">
                Years in Operation
                <InfoTooltip content="Number of complete years the company has been operational" />
              </Label>
              <Input
                id="yearsInOperation"
                type="number"
                min="0"
                placeholder="0"
                value={formData.details.yearsInOperation || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    details: {
                      ...formData.details,
                      yearsInOperation: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-1 flex-1">
                  <Label htmlFor="hasExportSales" className="flex items-center">
                    Export Sales
                    <InfoTooltip content="Companies with export sales may qualify for tax incentives" />
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Does the company export goods/services?
                  </p>
                </div>
                <Switch
                  id="hasExportSales"
                  checked={formData.details.hasExportSales}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      details: {
                        ...formData.details,
                        hasExportSales: checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            {formData.details.hasExportSales && (
              <div className="space-y-2">
                <Label htmlFor="exportSalesPercentage" className="flex items-center">
                  Export Sales Percentage (%)
                  <InfoTooltip content="Percentage of total sales from exports" />
                </Label>
                <Input
                  id="exportSalesPercentage"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={formData.details.exportSalesPercentage || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: {
                        ...formData.details,
                        exportSalesPercentage: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="text-lg"
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-1 flex-1">
                  <Label htmlFor="isSmallBusiness" className="flex items-center">
                    Small Business
                    <InfoTooltip content="Small businesses (revenue < TT$1M) may qualify for simplified tax treatment" />
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Is this a small business entity?
                  </p>
                </div>
                <Switch
                  id="isSmallBusiness"
                  checked={formData.details.isSmallBusiness}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      details: {
                        ...formData.details,
                        isSmallBusiness: checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2 border-t pt-4">
              <p className="text-sm font-medium">Tax Rates:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Standard corporation tax: 30%</li>
                <li>Petrochemical companies: 35%</li>
                <li>Business Levy: 0.6% of gross sales/receipts</li>
                <li>Green Fund Levy: 0.3% on gross sales/receipts</li>
                <li>Health Surcharge: 2.5% on chargeable profits over TT$1M</li>
              </ul>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                onClick={() => setStep(2)} 
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                size="lg"
              >
                Calculate Tax
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Indicator */}
      <div className="flex justify-center items-center gap-2 pt-4">
        <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
        <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
        <div className={`h-2 w-16 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
      </div>
    </form>
  );
};
