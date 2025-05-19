import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, Car, ShieldAlert } from 'lucide-react';
import * as React from 'react';

// Helper component for circular action buttons
interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

function ActionButton({ icon, label, href }: ActionButtonProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <a className="flex flex-col items-center space-y-2 text-center group">
        <div className="bg-card rounded-full w-28 h-28 md:w-32 md:h-32 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
          {React.cloneElement(icon as React.ReactElement, { className: "w-10 h-10 md:w-12 md:h-12 text-foreground" })}
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </a>
    </Link>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 px-4 text-center space-y-10">
      {/* Top Logo and App Name */}
      <div className="flex flex-col items-center space-y-3">
        <div className="bg-primary rounded-full p-3 shadow-md">
          <Image 
            src="https://placehold.co/80x80.png" 
            alt="Safe Locate Logo" 
            width={80} 
            height={80} 
            data-ai-hint="officer silhouette" 
            className="rounded-full" 
          />
        </div>
        <h1 className="text-3xl font-bold text-foreground tracking-wider">
          SAFE LOCATE
        </h1>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 w-full max-w-xs sm:max-w-sm">
        <ActionButton
          icon={<MapPin />}
          label="Send Location"
          href="#" // Placeholder link
        />
        <ActionButton
          icon={<Building2 />}
          label="Nearby Stations"
          href="#" // Placeholder link
        />
      </div>
      
      {/* Request Ride Button - Centered below the two */}
      <div className="w-full flex justify-center">
        <ActionButton
            icon={<Car />}
            label="Request Ride"
            href="/dispatch"
          />
      </div>

      {/* Emergency Button */}
      <div className="w-full max-w-xs sm:max-w-sm pt-6">
        <Link href="/sos" passHref legacyBehavior>
          <Button
            variant="destructive"
            className="w-full h-14 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Emergency SOS"
          >
            <ShieldAlert className="w-5 h-5 mr-2" />
            EMERGENCY
          </Button>
        </Link>
      </div>
    </div>
  );
}
