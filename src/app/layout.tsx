// src/app/layout.tsx
import { AppProviders } from './theme/providers';
import Navbar from '../components/navbar';
import { NotificationProvider } from '../components/context/NotificationContext'; // Importiere den Provider

export const metadata = {
  title: 'STC Time Manager',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <NotificationProvider> {/* Hier wird der NotificationProvider hinzugefügt */}
            <Navbar />
            <main style={{ padding: '1rem' }}>{children}</main>
          </NotificationProvider>
        </AppProviders>
      </body>
    </html>
  );
}
