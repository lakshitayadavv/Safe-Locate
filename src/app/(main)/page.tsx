
import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, Car, ShieldAlert } from 'lucide-react';

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
        <div className="p-1">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Safe Locate Logo Icon"
          >
            {/* Pin shape - Maroon */}
            <path
              d="M12 2C7.58172 2 4 5.58172 4 10C4 17 12 23 12 23C12 23 20 17 20 10C20 5.58172 16.4183 2 12 2Z"
              fill="hsl(var(--primary))"
            />
            {/* Inner circle for silhouette background - Light Pink */}
            <circle cx="12" cy="9.5" r="4.5" fill="hsl(var(--secondary))" />
            {/* Officer Silhouette - Maroon */}
            {/* Cap Top */}
            <ellipse cx="12" cy="6.8" rx="1.6" ry="0.7" fill="hsl(var(--primary))" />
            {/* Cap Brim */}
            <rect x="10" y="7.3" width="4" height="0.5" rx="0.2" fill="hsl(var(--primary))" />
            {/* Head */}
            <circle cx="12" cy="8.5" r="1.3" fill="hsl(var(--primary))" />
            {/* Body */}
            <path d="M10.0 10.0H14.0L13.5 12.5H10.5L10.0 10.0Z" fill="hsl(var(--primary))" />
          </svg>
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
          href="/nearby-stations"
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
