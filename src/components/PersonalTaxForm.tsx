import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PersonalTaxInput } from "@/types/tax";

interface PersonalTaxFormProps {
  onCalculate: (input: PersonalTaxInput) => void;
}

export const PersonalTaxForm = ({ onCalculate }: PersonalTaxFormProps) => {
  const [formData, setFormData] = useState<PersonalTaxInput>({
    annualIncome: 0,
    allowances: 0,
    otherDeductions: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const formatCurrency = (value: string) => {
    const number = parseFloat(value.replace(/,/g, ""));
    return isNaN(number) ? 0 : number;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="annualIncome">Annual Income (TT$)</Label>
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
                annualIncome: formatCurrency(e.target.value),
              })
            }
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">
            Enter your total annual income from all sources
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="allowances">Allowances (TT$)</Label>
          <Input
            id="allowances"
            type="number"
            placeholder="0.00"
            step="0.01"
            value={formData.allowances || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                allowances: formatCurrency(e.target.value),
              })
            }
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">
            Personal allowances, dependents, insurance premiums
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otherDeductions">Other Deductions (TT$)</Label>
          <Input
            id="otherDeductions"
            type="number"
            placeholder="0.00"
            step="0.01"
            value={formData.otherDeductions || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                otherDeductions: formatCurrency(e.target.value),
              })
            }
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">
            Mortgage interest, education expenses, medical costs
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Calculate Tax
      </Button>
    </form>
  );
};
