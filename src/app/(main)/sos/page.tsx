"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Send, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGeolocation, type UseGeolocationState } from '@/hooks/use-geolocation';
import { EmergencyContactBadge } from '@/components/shared/emergency-contact-badge';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { EmergencyContact } from '@/types';

export default function SOSPage() {
  const { toast } = useToast();
  const geolocation: UseGeolocationState = useGeolocation();
  const [isSOSSent, setIsSOSSent] = useState(false);
  const [contacts] = useLocalStorage<EmergencyContact[]>('emergencyContacts', []);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      handleConfirmSOS();
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);


  const handleInitiateSOS = () => {
    if (contacts.length === 0) {
        toast({
            title: "Cannot Send SOS",
            description: "Please add emergency contacts in settings first.",
            variant: "destructive",
        });
        return;
    }
    setCountdown(5); // Start 5-second countdown
  };

  const handleConfirmSOS = () => {
    if (geolocation.error) {
      toast({
        title: 'Error Sending SOS',
        description: `Could not get location: ${geolocation.error.message}`,
        variant: 'destructive',
      });
      return;
    }
    if (!geolocation.coordinates) {
      toast({
        title: 'Error Sending SOS',
        description: 'Location data is not available yet. Please wait and try again.',
        variant: 'destructive',
      });
      return;
    }

    const locationString = `Lat: ${geolocation.coordinates.latitude.toFixed(5)}, Lon: ${geolocation.coordinates.longitude.toFixed(5)}`;
    // Simulate sending SOS
    // In a real app, this would involve API calls to SMS gateways, etc.
    const contactDetails = contacts.map(c => `${c.name} (${c.phone})`).join(', ');
    
    toast({
      title: 'SOS Alert Activated!',
      description: `Emergency message sent to: ${contactDetails || 'your emergency contacts'} with your location: ${locationString}. (Simulation)`,
      variant: 'default',
      duration: 10000,
    });
    setIsSOSSent(true);
  };

  const handleCancelSOS = () => {
    setCountdown(null);
    toast({
      title: 'SOS Cancelled',
      description: 'SOS alert has been cancelled.',
    });
  };

  return (
    <div className="max-w-lg mx-auto text-center">
      <Card className="shadow-xl border-destructive border-2">
        <CardHeader>
          <div className="mx-auto bg-destructive text-destructive-foreground rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <CardTitle className="text-3xl font-bold text-destructive">SOS Emergency Alert</CardTitle>
          <CardDescription className="text-base">
            Trigger an immediate alert to your emergency contacts with your current location. Use this in critical situations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <EmergencyContactBadge actionDescription="you trigger an SOS alert" />

          {geolocation.loading && (
            <div className="flex items-center justify-center text-muted-foreground">
              <LoadingSpinner size={20} className="mr-2"/> Acquiring your location...
            </div>
          )}
          {geolocation.error && <p className="text-red-500 text-sm">Location Error: {geolocation.error.message}</p>}
          {geolocation.coordinates && (
            <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
              <p className="flex items-center justify-center gap-1"><MapPin className="w-4 h-4 text-primary"/> Your current location will be shared:</p>
              <p>Lat: {geolocation.coordinates.latitude.toFixed(5)}, Lon: {geolocation.coordinates.longitude.toFixed(5)}</p>
              <p>(Accuracy: {geolocation.coordinates.accuracy.toFixed(0)}m)</p>
            </div>
          )}

          {isSOSSent ? (
            <div className="p-4 bg-green-100 text-green-700 rounded-md">
              <h3 className="font-semibold text-lg">SOS Alert Sent!</h3>
              <p>Your emergency contacts have been notified. Help is on the way (simulation).</p>
            </div>
          ) : countdown !== null ? (
             <div className="space-y-4">
                <p className="text-2xl font-bold text-primary">Sending SOS in {countdown}...</p>
                <Button 
                    onClick={handleCancelSOS} 
                    variant="outline"
                    className="w-full text-lg py-6"
                    aria-label="Cancel SOS"
                >
                    Cancel SOS
                </Button>
            </div>
          ) : (
            <Button 
              onClick={handleInitiateSOS} 
              disabled={geolocation.loading || !geolocation.coordinates || contacts.length === 0}
              variant="destructive" 
              className="w-full text-xl py-8 rounded-lg shadow-lg pulse-accent"
              aria-label="Activate SOS Alert"
            >
              <Send className="w-6 h-6 mr-3" />
              ACTIVATE SOS ALERT
            </Button>
          )}
          <p className="text-xs text-muted-foreground">
            Activating SOS will send your current location and an emergency message to your registered contacts.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
