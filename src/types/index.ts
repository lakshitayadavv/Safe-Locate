export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

export interface PoliceStation {
  id:string;
  name: string;
  address: string;
  status: 'Operational' | 'Non-Operational' | 'Limited Service';
  latitude: number;
  longitude: number;
  phone: string;
  operationalStatus?: 'Online' | 'Offline' | 'Busy'; // For live operational status
}

// From AI flow - src/ai/flows/police-eta-prediction.ts
// Input type used by our application before calling the AI flow
export interface PoliceETAPredictionClientInput {
  userLocation: { latitude: number; longitude: number };
  destination: string;
  policeStationLocation: { latitude: number; longitude: number };
  vehicleAvailability: string; // e.g., "Available", "Limited"
  trafficConditions: string; // e.g., "Light", "Moderate", "Heavy"
  // Officer name and vehicle number can be empty if AI is to generate them
  policeOfficerName?: string; 
  policeVehicleNumber?: string;
}

// Output type received from the AI flow
export type { PoliceETAPredictionOutput } from '@/ai/flows/police-eta-prediction';
