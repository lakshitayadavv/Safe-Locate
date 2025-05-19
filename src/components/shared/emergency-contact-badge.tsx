"use client";

import { useLocalStorage } from '@/hooks/use-local-storage';
import type { EmergencyContact } from '@/types';
import { AlertTriangle, UserCircle } from 'lucide-react';
import Link from 'next/link';

interface EmergencyContactBadgeProps {
  actionDescription: string;
}

export function EmergencyContactBadge({ actionDescription }: EmergencyContactBadgeProps) {
  const [contacts] = useLocalStorage<EmergencyContact[]>('emergencyContacts', []);

  if (contacts.length === 0) {
    return (
      <div className="p-4 rounded-md bg-yellow-50 border border-yellow-300 text-yellow-700">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 mt-1 text-yellow-500" />
          <div>
            <h4 className="font-semibold">No Emergency Contacts</h4>
            <p className="text-sm">
              Please <Link href="/settings" className="underline hover:text-yellow-800">add emergency contacts</Link> in settings. 
              They will be notified when you {actionDescription}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-md bg-blue-50 border border-blue-300 text-blue-700">
      <h4 className="font-semibold mb-2">Emergency Contacts to be Notified:</h4>
      <ul className="space-y-1 text-sm">
        {contacts.map(contact => (
          <li key={contact.id} className="flex items-center gap-2">
            <UserCircle className="w-4 h-4 text-blue-500" />
            {contact.name} ({contact.phone})
          </li>
        ))}
      </ul>
      <p className="text-xs mt-2">Your location and {actionDescription} details will be shared with them.</p>
    </div>
  );
}
