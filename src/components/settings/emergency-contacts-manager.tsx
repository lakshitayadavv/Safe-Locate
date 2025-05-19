"use client";

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { EmergencyContact } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Trash2, UserPlus, Edit3, UserCircle, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const MAX_CONTACTS = 3;

export function EmergencyContactsManager() {
  const [contacts, setContacts] = useLocalStorage<EmergencyContact[]>('emergencyContacts', []);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const { toast } = useToast();

  const handleAddOrUpdateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast({ title: "Error", description: "Name and phone are required.", variant: "destructive" });
      return;
    }
    if (!/^\+?[0-9\s-()]{7,20}$/.test(phone)) {
       toast({ title: "Error", description: "Please enter a valid phone number.", variant: "destructive" });
       return;
    }

    if (editingContact) {
      setContacts(contacts.map(c => c.id === editingContact.id ? { ...c, name, phone } : c));
      toast({ title: "Success", description: "Contact updated." });
      setEditingContact(null);
    } else {
      if (contacts.length >= MAX_CONTACTS) {
        toast({ title: "Limit Reached", description: `You can add a maximum of ${MAX_CONTACTS} emergency contacts.`, variant: "destructive" });
        return;
      }
      const newContact: EmergencyContact = { id: Date.now().toString(), name, phone };
      setContacts([...contacts, newContact]);
      toast({ title: "Success", description: "Contact added." });
    }
    setName('');
    setPhone('');
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast({ title: "Success", description: "Contact deleted." });
    if (editingContact?.id === id) {
      setEditingContact(null);
      setName('');
      setPhone('');
    }
  };

  const handleEditContact = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setName(contact.name);
    setPhone(contact.phone);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setName('');
    setPhone('');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <UserCircle className="w-7 h-7 text-primary" />
          Emergency Contacts
        </CardTitle>
        <CardDescription>Manage your emergency contacts. These contacts will be notified in case of an SOS alert or dispatch request. You can add up to {MAX_CONTACTS} contacts.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddOrUpdateContact} className="space-y-4 mb-6 p-4 border rounded-lg bg-background/30">
          <h3 className="text-lg font-semibold">{editingContact ? 'Edit Contact' : 'Add New Contact'}</h3>
          <div>
            <Label htmlFor="contact-name" className="mb-1 block">Name</Label>
            <Input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Mom"
              required
              aria-label="Contact Name"
            />
          </div>
          <div>
            <Label htmlFor="contact-phone" className="mb-1 block">Phone Number</Label>
            <Input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g., +1 (555) 123-4567"
              required
              aria-label="Contact Phone Number"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={contacts.length >= MAX_CONTACTS && !editingContact}>
              {editingContact ? <Edit3 className="w-4 h-4 mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </Button>
            {editingContact && (
              <Button type="button" variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </form>

        {contacts.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No emergency contacts added yet.</p>
        ) : (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Your Contacts:</h3>
            {contacts.map(contact => (
              <Card key={contact.id} className="bg-background/50">
                <CardContent className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-primary-foregroundbrightness-150 flex items-center gap-2"><UserCircle className="w-5 h-5 text-primary" /> {contact.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Phone className="w-4 h-4" /> {contact.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditContact(contact)} aria-label={`Edit ${contact.name}`}>
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)} aria-label={`Delete ${contact.name}`}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
      {contacts.length > 0 && (
         <CardFooter>
            <p className="text-xs text-muted-foreground">
                {contacts.length} out of {MAX_CONTACTS} contacts added.
            </p>
         </CardFooter>
      )}
    </Card>
  );
}
