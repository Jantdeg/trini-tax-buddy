import { useState } from "react";
import { TaxCategoryCard } from "@/components/TaxCategoryCard";
import { PersonalTaxForm } from "@/components/PersonalTaxForm";
import { SoleTraderTaxForm } from "@/components/SoleTraderTaxForm";
import { CorporationTaxForm } from "@/components/CorporationTaxForm";
import { TaxCalculationResultComponent } from "@/components/TaxCalculationResult";
import {
  calculatePersonalTax,
  calculateSoleTraderTax,
  calculateCorporationTax,
} from "@/utils/taxCalculations";
import {
  TaxCategory,
  PersonalTaxInput,
  SoleTraderTaxInput,
  CorporationTaxInput,
  TaxCalculationResult,
} from "@/types/tax";
import { User, Briefcase, Building2, ArrowLeft, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<TaxCategory | null>(
    null
  );
  const [calculationResult, setCalculationResult] =
    useState<TaxCalculationResult | null>(null);

  const handlePersonalCalculate = (input: PersonalTaxInput) => {
    const result = calculatePersonalTax(input);
    setCalculationResult(result);
  };

  const handleSoleTraderCalculate = (input: SoleTraderTaxInput) => {
    const result = calculateSoleTraderTax(input);
    setCalculationResult(result);
  };

  const handleCorporationCalculate = (input: CorporationTaxInput) => {
    const result = calculateCorporationTax(input);
    setCalculationResult(result);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setCalculationResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-[var(--shadow-soft)]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Calculator className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  TT Tax Calculator
                </h1>
                <p className="text-sm text-muted-foreground">
                  Trinidad & Tobago Tax Estimation Tool
                </p>
              </div>
            </div>
            {selectedCategory && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Start Over
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {!selectedCategory && !calculationResult && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Select Your Tax Category
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the category that best describes you to calculate your
                estimated tax obligations for Trinidad & Tobago
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <TaxCategoryCard
                title="Personal"
                description="Employees, pensioners, and individuals with personal income"
                icon={User}
                onClick={() => setSelectedCategory("personal")}
                isSelected={false}
              />
              <TaxCategoryCard
                title="Sole Trader"
                description="Self-employed individuals and sole proprietorships"
                icon={Briefcase}
                onClick={() => setSelectedCategory("sole-trader")}
                isSelected={false}
              />
              <TaxCategoryCard
                title="Corporation"
                description="Companies, businesses, and corporate entities"
                icon={Building2}
                onClick={() => setSelectedCategory("corporation")}
                isSelected={false}
              />
            </div>
          </div>
        )}

        {selectedCategory && !calculationResult && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl shadow-[var(--shadow-medium)] p-8">
              <div className="space-y-6">
                <div className="text-center pb-6 border-b">
                  <h2 className="text-2xl font-bold text-foreground">
                    {selectedCategory === "personal"
                      ? "Personal Tax Calculator"
                      : selectedCategory === "sole-trader"
                        ? "Sole Trader Tax Calculator"
                        : "Corporation Tax Calculator"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter your financial information to calculate your estimated
                    tax
                  </p>
                </div>

                {selectedCategory === "personal" && (
                  <PersonalTaxForm onCalculate={handlePersonalCalculate} />
                )}
                {selectedCategory === "sole-trader" && (
                  <SoleTraderTaxForm onCalculate={handleSoleTraderCalculate} />
                )}
                {selectedCategory === "corporation" && (
                  <CorporationTaxForm
                    onCalculate={handleCorporationCalculate}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {calculationResult && (
          <div className="max-w-4xl mx-auto">
            <TaxCalculationResultComponent result={calculationResult} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Based on Trinidad & Tobago Inland Revenue Division guidelines.
            <br />
            For official tax information, visit{" "}
            <a
              href="https://www.ird.gov.tt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.ird.gov.tt
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
