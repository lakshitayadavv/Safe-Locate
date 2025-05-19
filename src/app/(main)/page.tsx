import { HeroActions } from '@/components/dashboard/hero-actions';
import { NearbyStations } from '@/components/dashboard/nearby-stations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="bg-primary/10 border-primary/30">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary flex items-center gap-2">
             Welcome to Guardian Angel
          </CardTitle>
          <CardDescription className="text-lg text-primary-foregroundbrightness-200">
            Your safety is our priority. Request assistance or alert emergency contacts with a single tap.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-foreground/80">
            This app helps you connect with local law enforcement when you feel unsafe or need help with transportation.
            </p>
        </CardContent>
      </Card>
      
      <HeroActions />
      
      <NearbyStations />

      <Card className="mt-8 bg-yellow-50 border-yellow-300">
        <CardHeader className="flex flex-row items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
          <div>
            <CardTitle className="text-yellow-700">Important Note</CardTitle>
            <CardDescription className="text-yellow-600">
              This application is a tool to assist you. In case of immediate, life-threatening danger, always try to call emergency services (e.g., 911, 112) directly if possible.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
