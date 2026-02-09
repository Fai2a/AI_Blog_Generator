import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Blog Generator | Create High-Quality Content in Seconds',
  description: 'The ultimate AI-powered blogging platform. Generate SEO-optimized, engaging blog posts instantly with advanced AI.',
  openGraph: {
    title: 'AI Blog Generator',
    description: 'Transform your ideas into professional blog posts with AI.',
    url: 'https://aiblog-generator.vercel.app',
    siteName: 'AI Blog Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Blog Generator',
    description: 'AI-powered blogging made simple.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
