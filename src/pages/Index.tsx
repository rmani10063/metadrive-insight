import { useState } from "react";
import InfotainmentHome from "@/components/InfotainmentHome";
import Dashboard from "./Dashboard";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
      {showDashboard ? (
        <Dashboard onClose={() => setShowDashboard(false)} />
      ) : (
        <InfotainmentHome onMetaDriveClick={() => setShowDashboard(true)} />
      )}
    </>
  );
};

export default Index;
