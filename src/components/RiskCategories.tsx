import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { RiskLevel } from "@/types/vehicle";
import { buttonVariants } from "./ui/button-variants";
import { cn } from "@/lib/utils";

interface RiskCategoriesProps {
  selectedRisk: RiskLevel | null;
  onRiskSelect: (risk: RiskLevel) => void;
  counts: { high: number; moderate: number; low: number };
}

const RiskCategories = ({ selectedRisk, onRiskSelect, counts }: RiskCategoriesProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center mb-2">Risk Categories</h2>
      
      <Button
        onClick={() => onRiskSelect("high")}
        className={cn(
          buttonVariants({ variant: "risk-high", size: "xl" }),
          selectedRisk === "high" && "ring-4 ring-risk-high"
        )}
      >
        <AlertTriangle className="h-6 w-6 mr-3" />
        <div className="flex-1 text-left">
          <div className="font-bold text-lg">HIGH RISK 🔴</div>
          <div className="text-xs opacity-90">Stop within 2 minutes</div>
        </div>
        <div className="text-2xl font-bold">{counts.high}</div>
      </Button>

      <Button
        onClick={() => onRiskSelect("moderate")}
        className={cn(
          buttonVariants({ variant: "risk-moderate", size: "xl" }),
          selectedRisk === "moderate" && "ring-4 ring-risk-moderate"
        )}
      >
        <AlertCircle className="h-6 w-6 mr-3" />
        <div className="flex-1 text-left">
          <div className="font-bold text-lg">MODERATE RISK 🟠</div>
          <div className="text-xs opacity-90">Stop in 10-20 min / reduce speed</div>
        </div>
        <div className="text-2xl font-bold">{counts.moderate}</div>
      </Button>

      <Button
        onClick={() => onRiskSelect("low")}
        className={cn(
          buttonVariants({ variant: "risk-low", size: "xl" }),
          selectedRisk === "low" && "ring-4 ring-risk-low"
        )}
      >
        <Info className="h-6 w-6 mr-3" />
        <div className="flex-1 text-left">
          <div className="font-bold text-lg">LOW RISK 🟡</div>
          <div className="text-xs opacity-90">Drive to nearest service</div>
        </div>
        <div className="text-2xl font-bold">{counts.low}</div>
      </Button>
    </div>
  );
};

export default RiskCategories;
