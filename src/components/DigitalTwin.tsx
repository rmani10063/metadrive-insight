import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Scan } from "lucide-react";
import digitalTwinImg from "@/assets/digital-twin.jpg";
import { useState } from "react";

const DigitalTwin = () => {
  const [viewMode, setViewMode] = useState<"vr" | "dashboard">("vr");

  return (
    <Card className="bg-card/60 backdrop-blur-xl border-cockpit-border p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Scan className="h-6 w-6 text-primary" />
          Digital Twin 3D
        </h3>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "vr" ? "neon" : "ghost"}
            size="sm"
            onClick={() => setViewMode("vr")}
          >
            <Eye className="h-4 w-4 mr-2" />
            VR View
          </Button>
          <Button
            variant={viewMode === "dashboard" ? "neon" : "ghost"}
            size="sm"
            onClick={() => setViewMode("dashboard")}
          >
            Dashboard
          </Button>
        </div>
      </div>

      <div className="relative aspect-square rounded-lg overflow-hidden group">
        <img
          src={digitalTwinImg}
          alt="Digital Twin 3D View"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-sm text-foreground font-semibold mb-2">
              {viewMode === "vr" ? "VR Mode Active" : "Dashboard View"}
            </p>
            <p className="text-xs text-muted-foreground">
              Interactive 3D visualization showing real-time vehicle diagnostics
            </p>
          </div>
        </div>
        
        {/* Scanning effect overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent animate-scan" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-card/40 p-2 rounded border border-border/50">
          <p className="text-muted-foreground">Model Resolution</p>
          <p className="font-semibold text-primary">High Fidelity</p>
        </div>
        <div className="bg-card/40 p-2 rounded border border-border/50">
          <p className="text-muted-foreground">Sensors Active</p>
          <p className="font-semibold text-primary">24/24</p>
        </div>
      </div>
    </Card>
  );
};

export default DigitalTwin;
