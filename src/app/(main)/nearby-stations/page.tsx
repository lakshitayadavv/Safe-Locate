
"use client";

import { StationCard } from '@/components/nearby-stations/station-card';
import type { PoliceStation } from '@/types';
import { Building2, MapPin, WifiOff, Loader2 } from 'lucide-react';
import { useGeolocation, type UseGeolocationState } from '@/hooks/use-geolocation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  {
    id: 'ps_ind_001',
    name: 'Indore Central Police Station',
    address: 'MG Road, Indore, MP 452001 (Mock Address)',
    status: 'Operational',
    latitude: 22.7196, // Approx Indore Lat
    longitude: 75.8577, // Approx Indore Lng
    phone: '(0731) 252-0000 (Mock Phone)',
    operationalStatus: 'Online',
  },
];

export default function NearbyStationsPage() {
  const geolocation: UseGeolocationState = useGeolocation();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <Building2 className="w-12 h-12 mx-auto text-primary mb-2" />
        <h1 className="text-3xl font-bold text-primary">Nearby Police Stations</h1>
        <p className="text-muted-foreground">
          Find police stations in your vicinity.
        </p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <MapPin className="w-5 h-5 text-primary" />
            Your Current Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          {geolocation.loading && (
            <div className="flex items-center text-muted-foreground">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Acquiring your location...
            </div>
          )}
          {geolocation.error && (
            <Alert variant="destructive">
              <WifiOff className="h-4 w-4" />
              <AlertTitle>Location Error</AlertTitle>
              <AlertDescription>
                Could not retrieve your location: {geolocation.error.message}. Please ensure location services are enabled.
              </AlertDescription>
            </Alert>
          )}
          {geolocation.coordinates && (
            <div className="text-sm space-y-1">
              <p><strong>Latitude:</strong> {geolocation.coordinates.latitude.toFixed(5)}</p>
              <p><strong>Longitude:</strong> {geolocation.coordinates.longitude.toFixed(5)}</p>
              <p className="text-xs text-muted-foreground">
                (Accuracy: {geolocation.coordinates.accuracy.toFixed(0)} meters)
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Please Note</AlertTitle>
        <AlertDescription>
          The station list below is mock data for demonstration. In a real application, this list would be dynamically populated with stations closest to your current location. The "Indore Central Police Station" has been added as per request.
        </AlertDescription>
      </Alert>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Conceptual Map View</CardTitle>
          <CardDescription>
            This is a placeholder for where an interactive map would be displayed.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center min-h-[300px]">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Conceptual map placeholder"
              width={600}
              height={400}
              className="rounded-md shadow-sm"
              data-ai-hint="map city"
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Imagine your location pinned here, with nearby police stations indicated.
            </p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Available Stations (Mock Data)</h2>
        {mockPoliceStations.length === 0 ? (
          <p className="text-center text-muted-foreground">No police stations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPoliceStations.map((station) => (
              <StationCard key={station.id} station={station} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
