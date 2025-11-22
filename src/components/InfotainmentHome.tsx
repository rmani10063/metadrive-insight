import { Car, Gauge, Map, Music, Video, Smartphone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import infotainmentBg from "@/assets/infotainment-bg.jpg";

interface InfotainmentHomeProps {
  onMetaDriveClick: () => void;
}

const InfotainmentHome = ({ onMetaDriveClick }: InfotainmentHomeProps) => {
  const apps = [
    { name: "Waze", icon: Navigation, color: "bg-blue-500" },
    { name: "Google Maps", icon: Map, color: "bg-green-500" },
    { name: "Spotify", icon: Music, color: "bg-green-600" },
    { name: "Netflix", icon: Video, color: "bg-red-600" },
    { name: "CarWebGuru", icon: Smartphone, color: "bg-purple-500" },
    { name: "MetaDrive", icon: Car, color: "bg-blue-600", special: true },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${infotainmentBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 container mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 text-foreground">
            <span className="text-primary">Infotainment</span> System
          </h1>
          <p className="text-muted-foreground text-lg">Select an application</p>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          {apps.map((app) => (
            <Button
              key={app.name}
              variant="glass"
              size="xl"
              onClick={app.special ? onMetaDriveClick : undefined}
              className="h-40 flex flex-col items-center justify-center gap-4 text-lg font-semibold relative"
            >
              <div className={`${app.color} p-6 rounded-2xl shadow-lg`}>
                <app.icon className="h-12 w-12 text-white" />
              </div>
              <span>{app.name}</span>
              {app.special && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              )}
            </Button>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Tap <span className="text-primary font-semibold">MetaDrive</span> for
            real-time vehicle diagnostics and predictive maintenance
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfotainmentHome;
