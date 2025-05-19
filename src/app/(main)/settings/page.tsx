import { EmergencyContactsManager } from '@/components/settings/emergency-contacts-manager';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Settings</h1>
      <EmergencyContactsManager />
    </div>
  );
}
