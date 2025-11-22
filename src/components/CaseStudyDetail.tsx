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
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-12 w-12">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Digital Twin & Component Image */}
          <div className="lg:col-span-1 space-y-6">
            {/* Digital Twin with Bounding Box */}
            <Card className={cn("p-4 border-2 bg-black/40", getRiskColor())}>
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Digital Twin - Component View
              </h3>
              <div className="relative w-full aspect-square bg-gradient-to-br from-background to-cockpit-glass/20 rounded-lg overflow-hidden border border-cockpit-border">
                <img
                  src={caseStudy.componentImage}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover opacity-90"
                />
                {/* Bounding Box around faulty component */}
                <div className={cn(
                  "absolute inset-[10%] border-4 rounded-lg animate-pulse",
                  caseStudy.risk === "high" && "border-risk-high shadow-[0_0_20px_rgba(239,68,68,0.6)]",
                  caseStudy.risk === "moderate" && "border-risk-moderate shadow-[0_0_20px_rgba(249,115,22,0.6)]",
                  caseStudy.risk === "low" && "border-risk-low shadow-[0_0_20px_rgba(234,179,8,0.6)]"
                )}>
                  <div className={cn(
                    "absolute -top-6 left-0 px-2 py-1 rounded text-xs font-bold",
                    caseStudy.risk === "high" && "bg-risk-high text-white",
                    caseStudy.risk === "moderate" && "bg-risk-moderate text-white",
                    caseStudy.risk === "low" && "bg-risk-low text-black"
                  )}>
                    FAULT DETECTED
                  </div>
                </div>
              </div>
            </Card>

            <Card className={cn("p-4 border-2", getRiskColor())}>
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  AI Recommendations
                </h3>
                <Badge variant="outline" className="text-xs">
                  {caseStudy.aiConfidence}% confidence
                </Badge>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">💡</span>
                  AI Suggestions:
                </p>
                <ul className="space-y-1.5">
                  {caseStudy.aiSuggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 mt-4">
                {caseStudy.risk === "high" && (
                  <>
                    <Button 
                      variant="destructive" 
                      size="lg" 
                      className="w-full justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Stop Immediately
                      </span>
                      <Badge variant="outline" className="bg-destructive/20 border-destructive text-white">
                        Critical
                      </Badge>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="lg" 
                      className="w-full justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Request Tow
                      </span>
                      <Badge variant="outline" className="bg-destructive/20 border-destructive text-white">
                        Critical
                      </Badge>
                    </Button>
                  </>
                )}
                
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=13.0569,80.1828"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button 
                    variant={caseStudy.risk === "high" ? "outline" : "default"}
                    size="lg" 
                    className="w-full justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Navigation className="h-5 w-5" />
                      Navigate to Service
                    </span>
                    <Badge variant="outline" className="bg-risk-moderate/20 border-risk-moderate">
                      High Priority
                    </Badge>
                  </Button>
                </a>
                
                <a 
                  href="tel:+914448596000"
                  className="block w-full"
                >
                  <Button 
                    variant={caseStudy.risk === "high" ? "outline" : "default"}
                    size="lg" 
                    className="w-full justify-between bg-green-600 hover:bg-green-700 text-white border-green-600"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Call Service
                    </span>
                    <Badge variant="outline" className="bg-green-700/20 border-green-400 text-white">
                      High Priority
                    </Badge>
                  </Button>
                </a>
              </div>
            </Card>

            <Card className="p-4 bg-primary/5 border-primary/50">
              <h3 className="text-lg font-bold mb-3">Expert Recommendation</h3>
              <p className="text-sm leading-relaxed">{caseStudy.recommendation}</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
