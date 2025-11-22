import { Card } from "@/components/ui/card";
import { CaseStudy } from "@/types/vehicle";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "./ui/button-variants";
import { cn } from "@/lib/utils";

interface ErrorPanelProps {
  activeIssues: CaseStudy[];
  onIssueClick: (issue: CaseStudy) => void;
}

const ErrorPanel = ({ activeIssues, onIssueClick }: ErrorPanelProps) => {
  const getRiskIcon = (risk: CaseStudy["risk"]) => {
    switch (risk) {
      case "high":
        return <AlertTriangle className="h-5 w-5" />;
      case "moderate":
        return <AlertCircle className="h-5 w-5" />;
      case "low":
        return <Info className="h-5 w-5" />;
    }
  };

  const getRiskVariant = (risk: CaseStudy["risk"]) => {
    switch (risk) {
      case "high":
        return "risk-high";
      case "moderate":
        return "risk-moderate";
      case "low":
        return "risk-low";
    }
  };

  return (
    <Card className="bg-card/60 backdrop-blur-xl border-cockpit-border p-4 h-full">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="h-6 w-6 text-destructive animate-pulse-glow" />
        Active Issues ({activeIssues.length})
      </h3>

      <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        {activeIssues.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-xl font-semibold text-green-500">All Systems OK</p>
            <p className="text-sm text-muted-foreground mt-2">
              No active issues detected
            </p>
          </div>
        ) : (
          activeIssues.map((issue) => (
            <Button
              key={issue.id}
              onClick={() => onIssueClick(issue)}
              className={cn(
                buttonVariants({ variant: getRiskVariant(issue.risk) }),
                "w-full h-auto py-4 justify-start text-left"
              )}
            >
              <div className="flex items-start gap-3 w-full">
                {getRiskIcon(issue.risk)}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm mb-1">{issue.title}</p>
                  <p className="text-xs opacity-90 line-clamp-2">{issue.summary}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-semibold">
                      AI: {issue.aiConfidence}%
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-background/30 rounded">
                      {issue.risk.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </Button>
          ))
        )}
      </div>
    </Card>
  );
};

export default ErrorPanel;
