import { StationCard } from '@/components/nearby-stations/station-card';
import type { PoliceStation } from '@/types';
import { Building2 } from 'lucide-react';

const mockPoliceStations: PoliceStation[] = [
  {
    id: 'ps_001',
    name: 'Central Precinct',
    address: '123 Main St, Cityville, ST 12345',
    status: 'Operational',
    latitude: 34.052235,
    longitude: -118.243683,
    phone: '(555) 123-4567',
    operationalStatus: 'Online',
  },
  {
    id: 'ps_002',
    name: 'Northwood Station',
    address: '456 Oak Ave, Cityville, ST 12346',
    status: 'Operational',
    latitude: 34.062235,
    longitude: -118.253683,
    phone: '(555) 234-5678',
    operationalStatus: 'Busy',
  },
  {
    id: 'ps_003',
    name: 'Westside Community Post',
    address: '789 Pine Ln, Cityville, ST 12347',
    status: 'Limited Service',
    latitude: 34.042235,
    longitude: -118.233683,
    phone: '(555) 345-6789',
  },
  {
    id: 'ps_004',
    name: 'Southpoint Division',
    address: '101 River Rd, Cityville, ST 12348',
    status: 'Non-Operational',
    latitude: 34.032235,
    longitude: -118.223683,
    phone: '(555) 456-7890',
    operationalStatus: 'Offline',
  },
];

export default function NearbyStationsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <Building2 className="w-12 h-12 mx-auto text-primary mb-2" />
        <h1 className="text-3xl font-bold text-primary">Nearby Police Stations</h1>
        <p className="text-muted-foreground">
          Find police stations in your vicinity. Please note this is mock data.
        </p>
      </div>

      {mockPoliceStations.length === 0 ? (
        <p className="text-center text-muted-foreground">No police stations found nearby.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPoliceStations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      )}
    </div>
  );
}
