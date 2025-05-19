"use client";

import type { PoliceStation } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Phone, ExternalLink, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StationCardProps {
  station: PoliceStation;
}

export function StationCard({ station }: StationCardProps) {
  const getStatusBadgeVariant = (status: PoliceStation['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Operational':
        return 'default'; // Uses primary color via theme
      case 'Limited Service':
        return 'secondary'; // Uses a secondary color
      case 'Non-Operational':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: PoliceStation['status']) => {
    switch (status) {
      case 'Operational':
        return <CheckCircle2 className="w-4 h-4 mr-1 text-green-600" />;
      case 'Limited Service':
        return <Info className="w-4 h-4 mr-1 text-yellow-600" />;
      case 'Non-Operational':
        return <AlertTriangle className="w-4 h-4 mr-1 text-red-600" />;
      default:
        return null;
    }
  };


  return (
    <Card className="shadow-lg flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Building2 className="w-8 h-8 text-primary mt-1 shrink-0" />
          <div>
            <CardTitle className="text-xl leading-tight">{station.name}</CardTitle>
            <Badge variant={getStatusBadgeVariant(station.status)} className="mt-1 text-xs">
             {getStatusIcon(station.status)} {station.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 pt-0">
        <div className="flex items-start text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-primary" />
          <span>{station.address}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Phone className="w-4 h-4 mr-2 shrink-0 text-primary" />
          <span>{station.phone}</span>
        </div>
        {station.operationalStatus && (
           <p className={cn(
            "text-xs font-medium p-1.5 rounded-md inline-flex items-center",
            station.operationalStatus === "Online" && "bg-green-100 text-green-700",
            station.operationalStatus === "Offline" && "bg-red-100 text-red-700",
            station.operationalStatus === "Busy" && "bg-yellow-100 text-yellow-700"
          )}>
            {station.operationalStatus === "Online" && <CheckCircle2 className="w-3 h-3 mr-1" />}
            {station.operationalStatus === "Offline" && <AlertTriangle className="w-3 h-3 mr-1" />}
            {station.operationalStatus === "Busy" && <Info className="w-3 h-3 mr-1" />}
            Live: {station.operationalStatus}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-3 flex gap-2 justify-end border-t">
        <Button variant="outline" size="sm" onClick={() => alert(`Calling ${station.name}... (simulation)`)} disabled={station.status === 'Non-Operational'}>
          <Phone className="w-4 h-4 mr-1.5" />
          Call
        </Button>
        <Button variant="default" size="sm" onClick={() => alert(`Viewing ${station.name} on map... (simulation)`)}>
          <ExternalLink className="w-4 h-4 mr-1.5" />
          View Map
        </Button>
      </CardFooter>
    </Card>
  );
}
