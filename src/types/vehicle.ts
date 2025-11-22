export type RiskLevel = "high" | "moderate" | "low";

export interface VehicleInfo {
  model: string;
  year: number;
  totalKm: number;
  engineHours: number;
  lastService: string;
  location: string;
  timestamp: string;
}

export interface SensorData {
  name: string;
  value: string;
  unit: string;
  status: "normal" | "warning" | "critical";
}

export interface CaseStudy {
  id: string;
  title: string;
  risk: RiskLevel;
  summary: string;
  componentImage: string;
  aiConfidence: number;
  sensors: SensorData[];
  timeline: TimelineEvent[];
  aiSuggestions: string[];
  recommendation: string;
  predictedFailure?: string;
}

export interface TimelineEvent {
  time: string;
  event: string;
  severity: "info" | "warning" | "critical";
}

export interface ServiceCenter {
  id: string;
  name: string;
  distance: string;
  eta: string;
  phone: string;
  services: string[];
  hasPickup: boolean;
  hasTowing: boolean;
  queueTime: string;
  landmark: string;
  rating: number;
  lat: number;
  lng: number;
}
