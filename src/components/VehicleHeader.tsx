import { VehicleInfo } from "@/types/vehicle";
import { Car, Clock, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface VehicleHeaderProps {
  vehicleInfo: VehicleInfo;
}

const VehicleHeader = ({ vehicleInfo }: VehicleHeaderProps) => {
  return (
    <Card className="bg-card/60 backdrop-blur-xl border-cockpit-border p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" />
          <div>
            <p className="text-muted-foreground text-xs">Vehicle</p>
            <p className="font-semibold">
              {vehicleInfo.model} {vehicleInfo.year}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          <div>
            <p className="text-muted-foreground text-xs">Odometer / Engine Hrs</p>
            <p className="font-semibold">
              {vehicleInfo.totalKm.toLocaleString()} km / {vehicleInfo.engineHours}h
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <div>
            <p className="text-muted-foreground text-xs">Last Service</p>
            <p className="font-semibold">{vehicleInfo.lastService}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <p className="text-muted-foreground text-xs">Location</p>
            <p className="font-semibold">{vehicleInfo.location}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/50">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Live GPS Timestamp</p>
          <p className="text-xs font-mono text-primary">{vehicleInfo.timestamp}</p>
        </div>
      </div>
    </Card>
  );
};

// Missing import for Gauge
import { Gauge } from "lucide-react";

export default VehicleHeader;
