import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sacred Styles',
  description: 'Where Black hair is honored.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

