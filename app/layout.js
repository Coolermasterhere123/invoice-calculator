import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Job Invoice Calculator',
  description: 'Markup on Materials Only • PST on Materials • GST on Materials + Labor',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon-192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}