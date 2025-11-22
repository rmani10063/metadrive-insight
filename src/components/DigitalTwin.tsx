import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import digitalTwinImage from "@/assets/digital-twin.jpg";
import { Scan, Eye, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { CaseStudy } from "@/types/vehicle";
import { cn } from "@/lib/utils";

interface DigitalTwinProps {
  caseStudies: CaseStudy[];
  selectedCaseId?: string;
  onCaseSelect?: (caseId: string) => void;
}

const DigitalTwin = ({ caseStudies, selectedCaseId, onCaseSelect }: DigitalTwinProps) => {
  const [viewMode, setViewMode] = useState<"vr" | "dashboard">("dashboard");
  const selectedCase = caseStudies.find(c => c.id === selectedCaseId);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "border-risk-high bg-risk-high/10";
      case "moderate":
        return "border-risk-moderate bg-risk-moderate/10";
      case "low":
        return "border-risk-low bg-risk-low/10";
      default:
        return "";
    }
  };

  return (
    <Card className="p-4 bg-cockpit-glass/30 border-cockpit-border backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Scan className="h-5 w-5 text-neon-cyan animate-pulse" />
          Digital Twin - 3D Vehicle Model
        </h3>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "vr" ? "neon" : "glass"}
            size="sm"
            onClick={() => setViewMode("vr")}
          >
            VR View
          </Button>
          <Button
            variant={viewMode === "dashboard" ? "neon" : "glass"}
            size="sm"
            onClick={() => setViewMode("dashboard")}
          >
            <Eye className="h-4 w-4 mr-1" />
            Dashboard
          </Button>
        </div>
      </div>

      <div className="relative w-full aspect-video bg-gradient-to-br from-background to-cockpit-glass/20 rounded-lg overflow-hidden border border-cockpit-border">
        <img
          src={selectedCase ? selectedCase.componentImage : digitalTwinImage}
          alt={selectedCase ? selectedCase.title : "Digital Twin 3D Model"}
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Scanning effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/10 via-transparent to-neon-cyan/10 animate-scan pointer-events-none" />
        
        {/* Bounding box if case selected */}
        {selectedCase && (
          <div className={cn(
            "absolute inset-[15%] border-4 rounded-lg animate-pulse",
            selectedCase.risk === "high" && "border-risk-high shadow-[0_0_20px_rgba(239,68,68,0.6)]",
            selectedCase.risk === "moderate" && "border-risk-moderate shadow-[0_0_20px_rgba(249,115,22,0.6)]",
            selectedCase.risk === "low" && "border-risk-low shadow-[0_0_20px_rgba(234,179,8,0.6)]"
          )}>
            <div className={cn(
              "absolute -top-6 left-0 px-2 py-1 rounded text-xs font-bold flex items-center gap-1",
              selectedCase.risk === "high" && "bg-risk-high text-white",
              selectedCase.risk === "moderate" && "bg-risk-moderate text-white",
              selectedCase.risk === "low" && "bg-risk-low text-black"
            )}>
              <AlertTriangle className="h-3 w-3" />
              FAULT DETECTED
            </div>
          </div>
        )}
        
        {/* Interactive hotspots */}
        {!selectedCase && (
          <>
            <div className="absolute top-[20%] left-[30%] animate-pulse">
              <div className="h-3 w-3 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </div>
            <div className="absolute top-[60%] right-[25%] animate-pulse delay-75">
              <div className="h-3 w-3 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </div>
          </>
        )}
      </div>

      {/* Case Study Selector */}
      <div className="mt-3 space-y-2">
        <p className="text-xs text-muted-foreground font-semibold">Select Case Study:</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedCaseId ? "neon" : "glass"}
            size="sm"
            onClick={() => onCaseSelect?.("")}
            className="text-xs"
          >
            All Components
          </Button>
          {caseStudies.map((caseStudy) => (
            <Button
              key={caseStudy.id}
              variant={selectedCaseId === caseStudy.id ? "neon" : "glass"}
              size="sm"
              onClick={() => onCaseSelect?.(caseStudy.id)}
              className={cn(
                "text-xs",
                selectedCaseId === caseStudy.id && getRiskColor(caseStudy.risk)
              )}
            >
              {caseStudy.title.split(" - ")[0]}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="text-center p-2 bg-cockpit-glass/20 rounded">
          <p className="text-xs text-muted-foreground">System Status</p>
          <Badge variant="outline" className="text-xs mt-1">Active</Badge>
        </div>
        <div className="text-center p-2 bg-cockpit-glass/20 rounded">
          <p className="text-xs text-muted-foreground">Components</p>
          <Badge variant="outline" className="text-xs mt-1">{caseStudies.length} Issues</Badge>
        </div>
        <div className="text-center p-2 bg-cockpit-glass/20 rounded">
          <p className="text-xs text-muted-foreground">View Mode</p>
          <Badge variant="outline" className="text-xs mt-1 border-neon-cyan text-neon-cyan">{viewMode.toUpperCase()}</Badge>
        </div>
      </div>
    </Card>
  );
};

export default DigitalTwin;
