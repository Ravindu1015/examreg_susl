import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider
// app/layout.tsx
import './globals.css'


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'University Exam Registration System',
  description: 'A platform for students to register for exams and administrators to manage registrations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <SessionProvider> {/* ⬅️ Wrap here */}
          {children}
        </SessionProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}