import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SoleTraderTaxInput } from "@/types/tax";
import { SoleTraderTaxFormData } from "@/types/soleTraderTaxTypes";
import { ArrowRight, ArrowLeft, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SoleTraderTaxFormProps {
  onCalculate: (input: SoleTraderTaxInput) => void;
}

export const SoleTraderTaxForm = ({ onCalculate }: SoleTraderTaxFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SoleTraderTaxFormData>({
    businessInfo: {
      annualRevenue: 0,
      costOfGoodsSold: 0,
      operatingExpenses: 0,
      employeeWages: 0,
      rentExpenses: 0,
      utilitiesExpenses: 0,
      advertisingExpenses: 0,
      vehicleExpenses: 0,
      officeSupplies: 0,
      professionalFees: 0,
      insuranceExpenses: 0,
      depreciationExpenses: 0,
      otherExpenses: 0,
    },
    employmentInfo: {
      numberOfEmployees: 0,
      annualPayroll: 0,
    },
    registrationInfo: {
      hasVATRegistration: false,
      hasBIRCertificate: false,
      businessStartDate: "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalExpenses = 
      formData.businessInfo.costOfGoodsSold +
      formData.businessInfo.operatingExpenses +
      formData.businessInfo.employeeWages +
      formData.businessInfo.rentExpenses +
      formData.businessInfo.utilitiesExpenses +
      formData.businessInfo.advertisingExpenses +
      formData.businessInfo.vehicleExpenses +
      formData.businessInfo.officeSupplies +
      formData.businessInfo.professionalFees +
      formData.businessInfo.insuranceExpenses +
      formData.businessInfo.depreciationExpenses +
      formData.businessInfo.otherExpenses;

    onCalculate({
      annualRevenue: formData.businessInfo.annualRevenue,
      businessExpenses: totalExpenses,
      numberOfEmployees: formData.employmentInfo.numberOfEmployees,
      hasVATRegistration: formData.registrationInfo.hasVATRegistration,
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
      {/* Step 1: Business Revenue & Income */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Business Revenue</CardTitle>
            <CardDescription>
              Enter your total business revenue for the tax year
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="annualRevenue" className="flex items-center">
                Total Annual Revenue (TT$)
                <InfoTooltip content="All income from sales, services, and business operations before any expenses" />
              </Label>
              <Input
                id="annualRevenue"
                type="number"
                placeholder="0.00"
                step="0.01"
                required
                value={formData.businessInfo.annualRevenue || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      annualRevenue: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">Revenue Includes:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Sales of goods and services</li>
                <li>Professional fees and commissions</li>
                <li>Rental income from business property</li>
                <li>Interest earned on business accounts</li>
              </ul>
            </div>

            <Button 
              type="button" 
              onClick={() => setStep(2)} 
              className="w-full"
              size="lg"
              disabled={!formData.businessInfo.annualRevenue}
            >
              Next: Business Expenses <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Business Expenses */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Business Expenses</CardTitle>
            <CardDescription>
              Enter all deductible business expenses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="costOfGoodsSold" className="flex items-center">
                Cost of Goods Sold (TT$)
                <InfoTooltip content="Direct costs of producing goods: raw materials, inventory, manufacturing costs" />
              </Label>
              <Input
                id="costOfGoodsSold"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.businessInfo.costOfGoodsSold || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      costOfGoodsSold: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeWages" className="flex items-center">
                Employee Wages & Salaries (TT$)
                <InfoTooltip content="Total wages, salaries, and bonuses paid to employees (excluding owner)" />
              </Label>
              <Input
                id="employeeWages"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.businessInfo.employeeWages || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      employeeWages: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentExpenses" className="flex items-center">
                Rent & Lease Payments (TT$)
                <InfoTooltip content="Business premises rent, equipment leasing, and property costs" />
              </Label>
              <Input
                id="rentExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.businessInfo.rentExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      rentExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="utilitiesExpenses" className="flex items-center">
                Utilities (TT$)
                <InfoTooltip content="Electricity, water, internet, phone, and other utility costs" />
              </Label>
              <Input
                id="utilitiesExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.businessInfo.utilitiesExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      utilitiesExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advertisingExpenses" className="flex items-center">
                Advertising & Marketing (TT$)
                <InfoTooltip content="Marketing costs, advertising, promotional materials, and website expenses" />
              </Label>
              <Input
                id="advertisingExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.businessInfo.advertisingExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      advertisingExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleExpenses" className="flex items-center">
                Vehicle & Transportation (TT$)
                <InfoTooltip content="Fuel, maintenance, insurance, and depreciation for business vehicles" />
              </Label>
              <Input
                id="vehicleExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.businessInfo.vehicleExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      vehicleExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="officeSupplies" className="flex items-center">
                Office Supplies & Equipment (TT$)
                <InfoTooltip content="Stationery, computer equipment, software, and office materials" />
              </Label>
              <Input
                id="officeSupplies"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.businessInfo.officeSupplies || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      officeSupplies: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="professionalFees" className="flex items-center">
                Professional Fees (TT$)
                <InfoTooltip content="Accounting, legal, consulting, and other professional service fees" />
              </Label>
              <Input
                id="professionalFees"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.businessInfo.professionalFees || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      professionalFees: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insuranceExpenses" className="flex items-center">
                Business Insurance (TT$)
                <InfoTooltip content="Business liability, property, and other business insurance premiums" />
              </Label>
              <Input
                id="insuranceExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.businessInfo.insuranceExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      insuranceExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="depreciationExpenses" className="flex items-center">
                Depreciation (TT$)
                <InfoTooltip content="Depreciation on business assets like equipment, vehicles, and property" />
              </Label>
              <Input
                id="depreciationExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.businessInfo.depreciationExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      depreciationExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherExpenses" className="flex items-center">
                Other Deductible Expenses (TT$)
                <InfoTooltip content="Bank charges, licenses, permits, and other allowable business expenses" />
              </Label>
              <Input
                id="otherExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.businessInfo.otherExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessInfo: {
                      ...formData.businessInfo,
                      otherExpenses: parseFloat(e.target.value) || 0,
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
                Next: Employment Info <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Employment & Registration */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Employment & Registration</CardTitle>
            <CardDescription>
              Employee information and business registration details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="numberOfEmployees" className="flex items-center">
                Number of Employees
                <InfoTooltip content="Total number of employees on payroll (excluding owner)" />
              </Label>
              <Input
                id="numberOfEmployees"
                type="number"
                min="0"
                placeholder="0"
                value={formData.employmentInfo.numberOfEmployees || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    employmentInfo: {
                      ...formData.employmentInfo,
                      numberOfEmployees: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualPayroll" className="flex items-center">
                Total Annual Payroll (TT$)
                <InfoTooltip content="Total wages, salaries, and benefits paid to all employees" />
              </Label>
              <Input
                id="annualPayroll"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.employmentInfo.annualPayroll || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    employmentInfo: {
                      ...formData.employmentInfo,
                      annualPayroll: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-1 flex-1">
                  <Label htmlFor="hasVATRegistration" className="flex items-center">
                    VAT Registered
                    <InfoTooltip content="Required if annual revenue exceeds TT$500,000" />
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Is your business registered for VAT?
                  </p>
                </div>
                <Switch
                  id="hasVATRegistration"
                  checked={formData.registrationInfo.hasVATRegistration}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      registrationInfo: {
                        ...formData.registrationInfo,
                        hasVATRegistration: checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-1 flex-1">
                  <Label htmlFor="hasBIRCertificate" className="flex items-center">
                    BIR Certificate
                    <InfoTooltip content="Board of Inland Revenue Certificate of Registration" />
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Do you have a valid BIR certificate?
                  </p>
                </div>
                <Switch
                  id="hasBIRCertificate"
                  checked={formData.registrationInfo.hasBIRCertificate}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      registrationInfo: {
                        ...formData.registrationInfo,
                        hasBIRCertificate: checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessStartDate" className="flex items-center">
                Business Start Date
                <InfoTooltip content="Date when business operations commenced" />
              </Label>
              <Input
                id="businessStartDate"
                type="date"
                value={formData.registrationInfo.businessStartDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registrationInfo: {
                      ...formData.registrationInfo,
                      businessStartDate: e.target.value,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2 border-t pt-4">
              <p className="text-sm font-medium">Important Notes:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>VAT registration is mandatory if revenue exceeds TT$500,000</li>
                <li>Keep all receipts and invoices for at least 7 years</li>
                <li>File quarterly VAT returns if registered</li>
                <li>Maintain proper accounting records</li>
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
