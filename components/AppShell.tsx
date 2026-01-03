'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MobileNav from '@/components/MobileNav';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isAuthRoute = pathname === '/login' || pathname === '/subscription-expired';
  
  // List of standalone pages that should be full-screen without global nav/footer
  const isStandalonePage = [
    '/about',
    '/contact',
    '/faq',
    '/help',
    '/terms',
    '/privacy',
    '/cookies',
    '/corporate',
    '/media'
  ].includes(pathname || '');

  const shouldHideNavAndFooter = isAdminRoute || isAuthRoute || isStandalonePage;

  return (
    <>
      {!shouldHideNavAndFooter && <Navbar />}
      <main className={!shouldHideNavAndFooter ? "pb-16 md:pb-0" : ""}>{children}</main>
      {!shouldHideNavAndFooter && <Footer />}
      {!shouldHideNavAndFooter && <MobileNav />}
    </>
  );
}
