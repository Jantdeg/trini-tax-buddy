import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CorporationTaxInput } from "@/types/tax";

interface CorporationTaxFormProps {
  onCalculate: (input: CorporationTaxInput) => void;
}

export const CorporationTaxForm = ({ onCalculate }: CorporationTaxFormProps) => {
  const [formData, setFormData] = useState<CorporationTaxInput>({
    grossSales: 0,
    allowableDeductions: 0,
    isPetrochemical: false,
    isNewBusiness: false,
    yearsInOperation: 0,
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
          <Label htmlFor="grossSales">Gross Sales/Receipts (TT$)</Label>
          <Input
            id="grossSales"
            type="number"
            placeholder="0.00"
            step="0.01"
            required
            value={formData.grossSales || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                grossSales: formatCurrency(e.target.value),
              })
            }
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">
            Total gross sales or receipts for the income year
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="allowableDeductions">
            Allowable Deductions (TT$)
          </Label>
          <Input
            id="allowableDeductions"
            type="number"
            placeholder="0.00"
            step="0.01"
            value={formData.allowableDeductions || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                allowableDeductions: formatCurrency(e.target.value),
              })
            }
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">
            Business expenses and other allowable deductions
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsInOperation">Years in Operation</Label>
          <Input
            id="yearsInOperation"
            type="number"
            placeholder="0"
            min="0"
            step="1"
            value={formData.yearsInOperation || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                yearsInOperation: parseInt(e.target.value) || 0,
              })
            }
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">
            Business Levy exempt for first 3 years
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary">
            <Checkbox
              id="isPetrochemical"
              checked={formData.isPetrochemical}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  isPetrochemical: checked === true,
                })
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor="isPetrochemical"
                className="text-sm font-medium cursor-pointer"
              >
                Petrochemical Company
              </Label>
              <p className="text-xs text-muted-foreground">
                Corporation tax rate is 35% instead of 30%
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary">
            <Checkbox
              id="isNewBusiness"
              checked={formData.isNewBusiness}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  isNewBusiness: checked === true,
                })
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor="isNewBusiness"
                className="text-sm font-medium cursor-pointer"
              >
                New Business
              </Label>
              <p className="text-xs text-muted-foreground">
                Exempt from Business Levy for first 3 years
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Calculate Tax
      </Button>
    </form>
  );
};
