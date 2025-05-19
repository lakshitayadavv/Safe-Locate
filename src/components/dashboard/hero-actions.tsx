"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PhoneCall, ShieldAlert } from 'lucide-react';

export function HeroActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-8">
      <Link href="/dispatch" passHref legacyBehavior>
        <Button
          variant="default"
          className="w-full h-24 sm:h-32 text-lg sm:text-xl py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow pulse-blue flex-col items-center justify-center gap-2"
          aria-label="Request Police Dispatch for assistance"
        >
          <PhoneCall className="w-8 h-8 sm:w-10 sm:h-10 mb-1" />
          Request Police Dispatch
        </Button>
      </Link>
      <Link href="/sos" passHref legacyBehavior>
        <Button
          variant="destructive"
          className="w-full h-24 sm:h-32 text-lg sm:text-xl py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow pulse-accent flex-col items-center justify-center gap-2"
          aria-label="Activate SOS Alert for immediate emergency"
        >
          <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 mb-1" />
          SOS Alert
        </Button>
      </Link>
    </div>
  );
}
