import './globals.css';
import { ThirdParty } from '@/components/ThirdParty';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(params: any) {
  const suffix = params?.page ? `- ${params?.page}` : '';

  return {
    title: `Partytown GTM plugin${suffix}`
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <ThirdParty />
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
