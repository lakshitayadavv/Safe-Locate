import Link from 'next/link';
import { Shield, Home, Settings, PhoneCall, LifeBuoy } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Shield className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Guardian Angel</h1>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="text-foreground hover:text-primary transition-colors p-2 rounded-md flex items-center gap-1 text-sm sm:text-base" aria-label="Home">
            <Home className="w-5 h-5 sm:w-4 sm:h-4" /> 
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link href="/sos" className="text-foreground hover:text-primary transition-colors p-2 rounded-md flex items-center gap-1 text-sm sm:text-base" aria-label="SOS">
            <LifeBuoy className="w-5 h-5 sm:w-4 sm:h-4" />
             <span className="hidden sm:inline">SOS</span>
          </Link>
          <Link href="/dispatch" className="text-foreground hover:text-primary transition-colors p-2 rounded-md flex items-center gap-1 text-sm sm:text-base" aria-label="Request Dispatch">
            <PhoneCall className="w-5 h-5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Dispatch</span>
          </Link>
          <Link href="/settings" className="text-foreground hover:text-primary transition-colors p-2 rounded-md" aria-label="Settings">
            <Settings className="w-6 h-6" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
