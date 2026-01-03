'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isAuthRoute = pathname === '/login' || pathname === '/subscription-expired';
  const shouldHideNavAndFooter = isAdminRoute || isAuthRoute;

  return (
    <>
      {!shouldHideNavAndFooter && <Navbar />}
      <main>{children}</main>
      {!shouldHideNavAndFooter && <Footer />}
    </>
  );
}
