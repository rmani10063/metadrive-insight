import { CaseStudy } from "@/types/vehicle";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "./ui/button-variants";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  X,
  Phone,
  Navigation,
  Truck,
  Clock,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
  onClose: () => void;
}

const CaseStudyDetail = ({ caseStudy, onClose }: CaseStudyDetailProps) => {
  const getRiskIcon = () => {
    switch (caseStudy.risk) {
      case "high":
        return <AlertTriangle className="h-8 w-8 text-risk-high" />;
      case "moderate":
        return <AlertCircle className="h-8 w-8 text-risk-moderate" />;
      case "low":
        return <Info className="h-8 w-8 text-risk-low" />;
    }
  };

  const getRiskColor = () => {
    switch (caseStudy.risk) {
      case "high":
        return "text-risk-high border-risk-high bg-risk-high/10";
      case "moderate":
        return "text-risk-moderate border-risk-moderate bg-risk-moderate/10";
      case "low":
        return "text-risk-low border-risk-low bg-risk-low/10";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg overflow-y-auto animate-fade-in">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {getRiskIcon()}
            <div>
              <h1 className="text-3xl font-bold">{caseStudy.title}</h1>
              <p className="text-muted-foreground">
                Case Study ID: {caseStudy.id.toUpperCase()}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-12 w-12">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Component Image & AI Analysis */}
          <div className="lg:col-span-1 space-y-6">
            <Card className={cn("p-4 border-2", getRiskColor())}>
              <img
                src={caseStudy.componentImage}
                alt={caseStudy.title}
                className="w-full aspect-square object-cover rounded-lg mb-4"
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Confidence</span>
                  <Badge variant="outline" className={getRiskColor()}>
                    {caseStudy.aiConfidence}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <Badge className={cn("uppercase", getRiskColor())}>
                    {caseStudy.risk}
                  </Badge>
                </div>
              </div>
            </Card>

            {caseStudy.predictedFailure && (
              <Card className="p-4 bg-destructive/10 border-destructive/50">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Predicted Failure</p>
                    <p className="text-xs text-muted-foreground">
                      {caseStudy.predictedFailure}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Middle Column: Issue Summary & Sensors */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-bold mb-3">Issue Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {caseStudy.summary}
              </p>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Live Sensor Data
              </h3>
              <div className="space-y-3">
                {caseStudy.sensors.map((sensor, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{sensor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {sensor.value} {sensor.unit}
                      </p>
                    </div>
                    <Badge
                      variant={sensor.status === "critical" ? "destructive" : "outline"}
                      className="capitalize"
                    >
                      {sensor.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-bold mb-3">Event Timeline</h3>
              <div className="space-y-3">
                {caseStudy.timeline.map((event, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full",
                          event.severity === "critical" && "bg-risk-high",
                          event.severity === "warning" && "bg-risk-moderate",
                          event.severity === "info" && "bg-primary"
                        )}
                      />
                      {idx < caseStudy.timeline.length - 1 && (
                        <div className="h-full w-0.5 bg-border my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <p className="text-xs font-mono text-muted-foreground">
                        {event.time}
                      </p>
                      <p className="text-sm">{event.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: AI Suggestions & Recommendation */}
          <div className="lg:col-span-1 space-y-6">
            <Card className={cn("p-4 border-2", getRiskColor())}>
              <h3 className="text-lg font-bold mb-3">🤖 AI Suggestions</h3>
              <ul className="space-y-2">
                {caseStudy.aiSuggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-1">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-4 bg-primary/5 border-primary/50">
              <h3 className="text-lg font-bold mb-3">Expert Recommendation</h3>
              <p className="text-sm leading-relaxed">{caseStudy.recommendation}</p>
            </Card>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-lg font-bold">Quick Actions</h3>
              <Button variant="neon" size="lg" className="w-full">
                <Navigation className="h-5 w-5 mr-2" />
                Navigate to Service Center
              </Button>
              <Button variant="cockpit" size="lg" className="w-full">
                <Phone className="h-5 w-5 mr-2" />
                Call Service Center
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <Truck className="h-5 w-5 mr-2" />
                Request Pickup / Towing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
