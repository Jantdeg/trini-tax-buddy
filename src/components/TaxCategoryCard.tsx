import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface TaxCategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  isSelected: boolean;
}

export const TaxCategoryCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  isSelected,
}: TaxCategoryCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={`
        relative overflow-hidden cursor-pointer transition-all duration-300 p-6
        hover:shadow-[var(--shadow-medium)] hover:scale-[1.02]
        ${
          isSelected
            ? "border-primary shadow-[var(--shadow-medium)] bg-gradient-to-br from-primary/5 to-transparent"
            : "border-border hover:border-primary/50"
        }
      `}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div
          className={`
          p-4 rounded-2xl transition-colors duration-300
          ${isSelected ? "bg-primary" : "bg-secondary"}
        `}
        >
          <Icon
            className={`h-8 w-8 ${isSelected ? "text-primary-foreground" : "text-primary"}`}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <svg
              className="h-4 w-4 text-primary-foreground"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
      )}
    </Card>
  );
};
