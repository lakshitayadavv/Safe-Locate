"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { PoliceStation } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Mock data for police stations
const MOCK_STATIONS: PoliceStation[] = [
  { id: 'ps1', name: 'Central Police Station', address: '123 Main St, Cityville', status: 'Operational', latitude: 34.0522, longitude: -118.2437, phone: '555-0101', operationalStatus: 'Online' },
  { id: 'ps2', name: 'North District Precinct', address: '456 North Ave, Cityville', status: 'Limited Service', latitude: 34.0550, longitude: -118.2450, phone: '555-0102', operationalStatus: 'Busy' },
  { id: 'ps3', name: 'West End Station', address: '789 West Blvd, Cityville', status: 'Operational', latitude: 34.0500, longitude: -118.2480, phone: '555-0103', operationalStatus: 'Online' },
  { id: 'ps4', name: 'South Sector HQ', address: '101 South Rd, Cityville', status: 'Non-Operational', latitude: 34.0480, longitude: -118.2420, phone: '555-0104', operationalStatus: 'Offline' },
];

const StationStatusIcon = ({ status }: { status: PoliceStation['operationalStatus'] }) => {
  switch (status) {
    case 'Online':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'Offline':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'Busy':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    default:
      return null;
  }
};


export function NearbyStations() {
  const [stations, setStations] = useState<PoliceStation[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you'd fetch this based on user's location
    setStations(MOCK_STATIONS);
  }, []);

  const handleCallStation = (stationName: string, phone: string) => {
    toast({
      title: `Calling ${stationName}`,
      description: `Dialing ${phone}... (Simulation)`,
    });
    // Simulate actual call: window.location.href = `tel:${phone}`;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <MapPin className="w-7 h-7 text-primary" />
          Nearby Police Stations
        </CardTitle>
        <CardDescription>Find and contact local police stations for assistance.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 rounded-lg overflow-hidden shadow-md">
          <Image 
            src="https://placehold.co/800x300.png" 
            alt="Map placeholder showing nearby police stations" 
            width={800} 
            height={300}
            className="w-full h-auto object-cover"
            data-ai-hint="map city police"
          />
        </div>
        {stations.length === 0 ? (
          <p>No police stations found nearby or still loading...</p>
        ) : (
          <div className="space-y-4">
            {stations.map((station) => (
              <Card key={station.id} className="bg-background/50 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                        {station.name}
                        <StationStatusIcon status={station.operationalStatus} />
                      </h3>
                      <p className="text-sm text-muted-foreground">{station.address}</p>
                      <p className="text-xs mt-1">Status: <span className={`font-medium ${station.status === 'Operational' ? 'text-green-600' : station.status === 'Limited Service' ? 'text-yellow-600' : 'text-red-600'}`}>{station.status}</span></p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCallStation(station.name, station.phone)}
                      disabled={station.status === 'Non-Operational'}
                      aria-label={`Call ${station.name}`}
                      className="w-full sm:w-auto"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Station
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
