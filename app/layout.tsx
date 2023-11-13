import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ComposedProviders } from '@/app/providers/composedProviders';

import { Navbar } from '@/widgets/navbar';
import { Footer } from '@/shared/ui/footer';

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
          <header className="sticky top-0 z-50">
            <Navbar />
          </header>
          <main>{children}</main>
          <footer>
            <Footer>
              ©2023 Copyright:{' '}
              <a
                target="_blank"
                href="https://www.linkedin.com/in/valentyn-zhyvotchenko/"
              >
                Valentyn Zhyvotchenko
              </a>
            </Footer>
          </footer>
        </ComposedProviders>
      </body>
    </html>
  );
}
