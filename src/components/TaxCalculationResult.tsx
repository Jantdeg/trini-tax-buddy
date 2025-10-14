import { Card } from "@/components/ui/card";
import { TaxCalculationResult } from "@/types/tax";
import { Separator } from "@/components/ui/separator";
import { FileText, CheckCircle2 } from "lucide-react";

interface TaxCalculationResultProps {
  result: TaxCalculationResult;
}

export const TaxCalculationResultComponent = ({
  result,
}: TaxCalculationResultProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-TT", {
      style: "currency",
      currency: "TTD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Tax Summary Document */}
      <Card className="p-8 shadow-[var(--shadow-medium)]">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center border-b pb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Tax Calculation Summary
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Republic of Trinidad and Tobago
            </p>
            <p className="text-sm text-muted-foreground">
              Board of Inland Revenue
            </p>
          </div>

          {/* Category Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                {result.category === "personal"
                  ? "Individual Taxpayer"
                  : result.category === "sole-trader"
                    ? "Sole Trader / Self-Employed"
                    : "Corporation"}
              </span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-3">
            {result.breakdown.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-start py-2">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{item.label}</p>
                    {item.rate && (
                      <p className="text-xs text-muted-foreground">
                        Rate: {item.rate}
                      </p>
                    )}
                  </div>
                  <p
                    className={`text-lg font-semibold ${
                      item.amount < 0
                        ? "text-destructive"
                        : item.label.includes("Tax") ||
                            item.label.includes("Levy") ||
                            item.label.includes("Surcharge")
                          ? "text-accent"
                          : "text-foreground"
                    }`}
                  >
                    {formatCurrency(Math.abs(item.amount))}
                    {item.amount < 0 && " (-)"}
                  </p>
                </div>
                {index < result.breakdown.length - 1 && (
                  <Separator className="mt-2" />
                )}
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="pt-4 border-t-2 border-primary/20">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-foreground">
                Total Tax Liability
              </p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(result.totalTax)}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="pt-4 text-center">
            <p className="text-xs text-muted-foreground italic">
              This is an estimated calculation. Please consult with the Board of
              Inland Revenue or a tax professional for official assessment.
            </p>
          </div>
        </div>
      </Card>

      {/* Required Documents */}
      <Card className="p-6 shadow-[var(--shadow-soft)]">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Required Documents for Submission
            </h3>
          </div>
          <Separator />
          <ul className="space-y-3">
            {result.requiredDocuments.map((doc, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};
