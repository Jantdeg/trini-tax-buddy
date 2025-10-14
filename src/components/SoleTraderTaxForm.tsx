import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SoleTraderTaxInput } from "@/types/tax";

interface SoleTraderTaxFormProps {
  onCalculate: (input: SoleTraderTaxInput) => void;
}

export const SoleTraderTaxForm = ({ onCalculate }: SoleTraderTaxFormProps) => {
  const [formData, setFormData] = useState<SoleTraderTaxInput>({
    annualRevenue: 0,
    businessExpenses: 0,
    numberOfEmployees: 0,
    hasVATRegistration: false,
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
          <Label htmlFor="annualRevenue">Annual Revenue (TT$)</Label>
          <Input
            id="annualRevenue"
            type="number"
            placeholder="0.00"
            step="0.01"
            required
            value={formData.annualRevenue || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                annualRevenue: formatCurrency(e.target.value),
              })
            }
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">
            Total gross sales or receipts from your business
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessExpenses">Business Expenses (TT$)</Label>
          <Input
            id="businessExpenses"
            type="number"
            placeholder="0.00"
            step="0.01"
            value={formData.businessExpenses || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                businessExpenses: formatCurrency(e.target.value),
              })
            }
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">
            Allowable business deductions and expenses
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfEmployees">Number of Employees</Label>
          <Input
            id="numberOfEmployees"
            type="number"
            placeholder="0"
            min="0"
            step="1"
            value={formData.numberOfEmployees || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                numberOfEmployees: parseInt(e.target.value) || 0,
              })
            }
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">
            If you have employees, additional PAYE obligations apply
          </p>
        </div>

        <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary">
          <Checkbox
            id="hasVATRegistration"
            checked={formData.hasVATRegistration}
            onCheckedChange={(checked) =>
              setFormData({
                ...formData,
                hasVATRegistration: checked === true,
              })
            }
          />
          <div className="space-y-1">
            <Label
              htmlFor="hasVATRegistration"
              className="text-sm font-medium cursor-pointer"
            >
              VAT Registered
            </Label>
            <p className="text-xs text-muted-foreground">
              Required if annual revenue exceeds TT$500,000
            </p>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Calculate Tax
      </Button>
    </form>
  );
};
