import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { serviceCenters } from "@/data/serviceCenters";
import {
  MapPin,
  Phone,
  Navigation,
  Star,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ServiceCenterFinder = () => {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleNavigate = (lat: number, lng: number) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          Nearby Service Centers
        </h2>
        <Badge variant="outline" className="text-sm">
          {serviceCenters.length} Centers Found
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {serviceCenters.map((center) => (
          <Card key={center.id} className="p-4 bg-card/60 backdrop-blur-xl border-cockpit-border">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{center.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {center.landmark}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-semibold text-sm">{center.rating}</span>
                </div>
              </div>

              <Separator />

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Distance</p>
                  <p className="font-semibold">{center.distance}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">ETA</p>
                  <p className="font-semibold">{center.eta}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Queue Time</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {center.queueTime}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Contact</p>
                  <p className="font-semibold text-xs">{center.phone}</p>
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="text-muted-foreground text-xs mb-2">Services Available</p>
                <div className="flex flex-wrap gap-1">
                  {center.services.map((service, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  {center.hasPickup ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>Pickup</span>
                </div>
                <div className="flex items-center gap-1">
                  {center.hasTowing ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>Towing</span>
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="neon"
                  size="sm"
                  onClick={() => handleNavigate(center.lat, center.lng)}
                  className="w-full"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
                <Button
                  variant="cockpit"
                  size="sm"
                  onClick={() => handleCall(center.phone)}
                  className="w-full"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>

              {center.hasPickup && (
                <Button variant="outline" size="sm" className="w-full">
                  <Truck className="h-4 w-4 mr-2" />
                  Request Pickup
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceCenterFinder;
