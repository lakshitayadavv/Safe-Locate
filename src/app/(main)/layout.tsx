import { Header } from '@/components/shared/header';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-primary text-primary-foreground text-center p-4 text-sm">
        Safe Locate &copy; {new Date().getFullYear()} - Your safety, our priority.
      </footer>
    </div>
  );
}
