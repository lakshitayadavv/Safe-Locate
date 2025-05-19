"use client";

import type { PoliceETAPredictionOutput } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Car, UserCircle, Route } from 'lucide-react';

interface EtaCardProps {
  etaDetails: PoliceETAPredictionOutput;
}

export function EtaCard({ etaDetails }: EtaCardProps) {
  return (
    <Card className="shadow-lg bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2">
          <Clock className="w-7 h-7" />
          Dispatch & ETA Details
        </CardTitle>
        <CardDescription>
          A police vehicle is on its way. Here are the details:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 rounded-md bg-background shadow">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            Estimated Arrival Time
          </h4>
          <p className="text-xl font-bold text-accent">{etaDetails.estimatedArrivalTime || 'Calculating...'}</p>
        </div>

        {etaDetails.reroutingInformation && etaDetails.reroutingInformation !== "N/A" && etaDetails.reroutingInformation !== "None" && (
          <div className="p-3 rounded-md bg-background shadow">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Route className="w-5 h-5 text-primary" />
              Rerouting Information
            </h4>
            <p>{etaDetails.reroutingInformation}</p>
          </div>
        )}

        <div className="p-3 rounded-md bg-background shadow">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-primary" />
            Police Officer Details
          </h4>
          <p>{etaDetails.policeOfficerDetails || 'To be assigned'}</p>
        </div>

        <div className="p-3 rounded-md bg-background shadow">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            Police Vehicle Details
          </h4>
          <p>{etaDetails.policeVehicleDetails || 'To be assigned'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
