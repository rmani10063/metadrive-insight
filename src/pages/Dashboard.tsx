import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Home } from "lucide-react";
import VehicleHeader from "@/components/VehicleHeader";
import RiskCategories from "@/components/RiskCategories";
import ErrorPanel from "@/components/ErrorPanel";
import DigitalTwin from "@/components/DigitalTwin";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import ServiceCenterFinder from "@/components/ServiceCenterFinder";
import { VehicleInfo, RiskLevel, CaseStudy } from "@/types/vehicle";
import { caseStudies } from "@/data/caseStudies";
import { toast } from "sonner";

interface DashboardProps {
  onClose: () => void;
}

const Dashboard = ({ onClose }: DashboardProps) => {
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [digitalTwinCaseId, setDigitalTwinCaseId] = useState<string>("");

  const vehicleInfo: VehicleInfo = {
    model: "BMW X5",
    year: 2023,
    totalKm: 45280,
    engineHours: 1820,
    lastService: "15-Oct-2024",
    location: "Ramapuram, Chennai 600089",
    timestamp: "2024-11-22 14:32:45 IST",
  };

  const riskCounts = {
    high: caseStudies.filter((c) => c.risk === "high").length,
    moderate: caseStudies.filter((c) => c.risk === "moderate").length,
    low: caseStudies.filter((c) => c.risk === "low").length,
  };

  const totalIssues = riskCounts.high + riskCounts.moderate + riskCounts.low;

  const filteredCases = selectedRisk
    ? caseStudies.filter((c) => c.risk === selectedRisk)
    : caseStudies;

  const handleRiskSelect = (risk: RiskLevel) => {
    setSelectedRisk(risk);
    toast.info(`Showing ${risk.toUpperCase()} risk issues`);
  };

  const handleIssueClick = (issue: CaseStudy) => {
    setSelectedCase(issue);
  };

  const handleCloseCase = () => {
    setSelectedCase(null);
  };

  // Auto-close if no issues
  if (totalIssues === 0) {
    toast.success("Vehicle Healthy — Enjoy Your Journey", {
      duration: 3000,
    });
    setTimeout(() => onClose(), 3000);
  }

  if (selectedCase) {
    return <CaseStudyDetail caseStudy={selectedCase} onClose={handleCloseCase} />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 animate-fade-in">
      <div className="container mx-auto max-w-[1800px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <span className="text-primary">MetaDrive</span>
              <span className="text-muted-foreground">—</span>
              <span>Predictive Vehicle Intelligence</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time diagnostic dashboard powered by AI
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-12 w-12">
            <Home className="h-6 w-6" />
          </Button>
        </div>

        <VehicleHeader vehicleInfo={vehicleInfo} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left: Digital Twin */}
          <div className="lg:col-span-3">
            <DigitalTwin 
              caseStudies={caseStudies}
              selectedCaseId={digitalTwinCaseId}
              onCaseSelect={setDigitalTwinCaseId}
            />
          </div>

          {/* Center: Risk Categories */}
          <div className="lg:col-span-4">
            <RiskCategories
              selectedRisk={selectedRisk}
              onRiskSelect={handleRiskSelect}
              counts={riskCounts}
            />
            
            {selectedRisk && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRisk(null)}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filter
                </Button>
              </div>
            )}
          </div>

          {/* Right: Error Panel */}
          <div className="lg:col-span-5">
            <ErrorPanel activeIssues={filteredCases} onIssueClick={handleIssueClick} />
          </div>
        </div>

        {/* Service Center Finder */}
        <ServiceCenterFinder />
      </div>
    </div>
  );
};

export default Dashboard;
