import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ComposedProviders } from '@/app/providers/composedProviders';

import Navbar from '@/widgets/navbar/ui';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Candy Bar Builder',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ComposedProviders>
          <header className='sticky top-0 z-50'>
            <Navbar />
          </header>
          <main>
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
        </ComposedProviders>
      </body>
    </html>
  );
}
