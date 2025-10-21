import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalTaxInput } from "@/types/tax";
import { PersonalTaxFormData, PersonalAllowances, PersonalDeductions } from "@/types/personalTaxTypes";
import { ArrowRight, ArrowLeft, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PersonalTaxFormProps {
  onCalculate: (input: PersonalTaxInput) => void;
}

export const PersonalTaxForm = ({ onCalculate }: PersonalTaxFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PersonalTaxFormData>({
    annualIncome: 0,
    allowances: {
      personalAllowance: 90000,
      spouseAllowance: 0,
      dependentChildren: 0,
      dependentChildrenAmount: 0,
      tertiaryEducation: 0,
      tertiaryEducationAmount: 0,
      lifeInsurance: 0,
      healthInsurance: 0,
      mortgageInterest: 0,
    },
    deductions: {
      approvedPension: 0,
      nationalInsurance: 0,
      educationExpenses: 0,
      medicalExpenses: 0,
      charitableDonations: 0,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalAllowances = 
      formData.allowances.personalAllowance +
      formData.allowances.spouseAllowance +
      formData.allowances.dependentChildrenAmount +
      formData.allowances.tertiaryEducationAmount +
      formData.allowances.lifeInsurance +
      formData.allowances.healthInsurance +
      formData.allowances.mortgageInterest;

    const totalDeductions = 
      formData.deductions.approvedPension +
      formData.deductions.nationalInsurance +
      formData.deductions.educationExpenses +
      formData.deductions.medicalExpenses +
      formData.deductions.charitableDonations;

    onCalculate({
      annualIncome: formData.annualIncome,
      allowances: totalAllowances,
      otherDeductions: totalDeductions,
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
      {/* Step 1: Income */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Income Information</CardTitle>
            <CardDescription>
              Enter all sources of income for the tax year
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="annualIncome" className="flex items-center">
                Total Annual Income (TT$)
                <InfoTooltip content="Include salary, wages, bonuses, rental income, dividends, and any other taxable income" />
              </Label>
              <Input
                id="annualIncome"
                type="number"
                placeholder="0.00"
                step="0.01"
                required
                value={formData.annualIncome || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    annualIncome: parseFloat(e.target.value) || 0,
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">Income Sources Include:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Employment salary and wages</li>
                <li>Bonuses and commissions</li>
                <li>Rental income from properties</li>
                <li>Interest and dividends</li>
                <li>Business or self-employment income</li>
              </ul>
            </div>

            <Button 
              type="button" 
              onClick={() => setStep(2)} 
              className="w-full"
              size="lg"
              disabled={!formData.annualIncome}
            >
              Next: Allowances <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Allowances */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Tax Allowances</CardTitle>
            <CardDescription>
              Select applicable allowances to reduce your taxable income
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="personalAllowance" className="flex items-center">
                Personal Allowance (TT$)
                <InfoTooltip content="Standard personal allowance of TT$90,000 per year. Every taxpayer is entitled to this." />
              </Label>
              <Input
                id="personalAllowance"
                type="number"
                value={formData.allowances.personalAllowance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allowances: {
                      ...formData.allowances,
                      personalAllowance: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseAllowance" className="flex items-center">
                Spouse Allowance (TT$)
                <InfoTooltip content="If your spouse has no income or earns less than TT$90,000, you may claim up to TT$90,000" />
              </Label>
              <Input
                id="spouseAllowance"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.allowances.spouseAllowance || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allowances: {
                      ...formData.allowances,
                      spouseAllowance: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="dependentChildren" className="flex items-center">
                  Number of Dependent Children
                  <InfoTooltip content="Children under 18 or full-time students under 25" />
                </Label>
                <Input
                  id="dependentChildren"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.allowances.dependentChildren || ""}
                  onChange={(e) => {
                    const children = parseInt(e.target.value) || 0;
                    setFormData({
                      ...formData,
                      allowances: {
                        ...formData.allowances,
                        dependentChildren: children,
                        dependentChildrenAmount: children * 4800,
                      },
                    });
                  }}
                  className="text-lg"
                />
              </div>
              {formData.allowances.dependentChildren > 0 && (
                <div className="bg-success/10 p-3 rounded-lg">
                  <p className="text-sm font-medium">
                    Allowance: TT${formData.allowances.dependentChildrenAmount.toLocaleString()} 
                    <span className="text-muted-foreground ml-2">
                      (TT$4,800 per child)
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="tertiaryEducation" className="flex items-center">
                  Children in Tertiary Education
                  <InfoTooltip content="Children enrolled in approved tertiary institutions" />
                </Label>
                <Input
                  id="tertiaryEducation"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.allowances.tertiaryEducation || ""}
                  onChange={(e) => {
                    const students = parseInt(e.target.value) || 0;
                    setFormData({
                      ...formData,
                      allowances: {
                        ...formData.allowances,
                        tertiaryEducation: students,
                        tertiaryEducationAmount: students * 12000,
                      },
                    });
                  }}
                  className="text-lg"
                />
              </div>
              {formData.allowances.tertiaryEducation > 0 && (
                <div className="bg-success/10 p-3 rounded-lg">
                  <p className="text-sm font-medium">
                    Allowance: TT${formData.allowances.tertiaryEducationAmount.toLocaleString()}
                    <span className="text-muted-foreground ml-2">
                      (TT$12,000 per student)
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 border-t pt-4">
              <Label htmlFor="lifeInsurance" className="flex items-center">
                Life Insurance Premiums (TT$)
                <InfoTooltip content="Annual premiums paid for life insurance policies (maximum TT$50,000)" />
              </Label>
              <Input
                id="lifeInsurance"
                type="number"
                placeholder="0.00"
                step="0.01"
                max="50000"
                value={formData.allowances.lifeInsurance || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allowances: {
                      ...formData.allowances,
                      lifeInsurance: Math.min(parseFloat(e.target.value) || 0, 50000),
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthInsurance" className="flex items-center">
                Health Insurance Premiums (TT$)
                <InfoTooltip content="Annual premiums paid for health/medical insurance" />
              </Label>
              <Input
                id="healthInsurance"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.allowances.healthInsurance || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allowances: {
                      ...formData.allowances,
                      healthInsurance: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mortgageInterest" className="flex items-center">
                Mortgage Interest (TT$)
                <InfoTooltip content="Annual interest paid on approved mortgage for primary residence (maximum TT$25,000)" />
              </Label>
              <Input
                id="mortgageInterest"
                type="number"
                placeholder="0.00"
                step="0.01"
                max="25000"
                value={formData.allowances.mortgageInterest || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allowances: {
                      ...formData.allowances,
                      mortgageInterest: Math.min(parseFloat(e.target.value) || 0, 25000),
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
                Next: Deductions <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Other Deductions */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Tax Deductions</CardTitle>
            <CardDescription>
              Additional deductions that reduce your taxable income
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="approvedPension" className="flex items-center">
                Approved Pension Contributions (TT$)
                <InfoTooltip content="Contributions to approved pension plans and retirement funds" />
              </Label>
              <Input
                id="approvedPension"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.deductions.approvedPension || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductions: {
                      ...formData.deductions,
                      approvedPension: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationalInsurance" className="flex items-center">
                National Insurance (NIS) Contributions (TT$)
                <InfoTooltip content="Employee contributions to National Insurance Scheme" />
              </Label>
              <Input
                id="nationalInsurance"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.deductions.nationalInsurance || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductions: {
                      ...formData.deductions,
                      nationalInsurance: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="educationExpenses" className="flex items-center">
                Education Expenses (TT$)
                <InfoTooltip content="Tuition fees, books, and educational materials for approved courses" />
              </Label>
              <Input
                id="educationExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.deductions.educationExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductions: {
                      ...formData.deductions,
                      educationExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalExpenses" className="flex items-center">
                Medical Expenses (TT$)
                <InfoTooltip content="Unreimbursed medical and dental expenses exceeding 3% of income" />
              </Label>
              <Input
                id="medicalExpenses"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.deductions.medicalExpenses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductions: {
                      ...formData.deductions,
                      medicalExpenses: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="charitableDonations" className="flex items-center">
                Charitable Donations (TT$)
                <InfoTooltip content="Donations to approved charitable organizations (maximum 15% of chargeable income)" />
              </Label>
              <Input
                id="charitableDonations"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.deductions.charitableDonations || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductions: {
                      ...formData.deductions,
                      charitableDonations: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="text-lg"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2 border-t pt-4">
              <p className="text-sm font-medium">Common Deductible Expenses:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Professional membership fees</li>
                <li>Union dues</li>
                <li>Work-related tools and equipment</li>
                <li>Home office expenses (if self-employed)</li>
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
