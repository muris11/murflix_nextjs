import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import AppShell from "@/components/AppShell";
import BackToTop from "@/components/BackToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#141414",
  width: "device-width",
  initialScale: 1,
  // Removed maximumScale and userScalable: false for accessibility
  // Users should be able to zoom for better readability
};

export const metadata: Metadata = {
  title: "Murflix - Your Movie Streaming Hub",
  description:
    "Murflix - Your Movie Streaming Hub. Watch the latest movies and TV shows online. Browse trending content, discover new releases, and enjoy unlimited entertainment.",
  keywords: ["movies", "tv shows", "streaming", "entertainment", "murflix"],
  authors: [{ name: "Murflix" }],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Murflix",
  },
  openGraph: {
    title: "Murflix - Watch Movies & TV Shows Online",
    description:
      "Your destination for streaming the latest movies and TV shows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body suppressHydrationWarning>
        <Script
          id="strip-bis-attrs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof document==='undefined'){return;}function strip(){var nodes=document.querySelectorAll('[bis_skin_checked],[bis_id],[bis_size]');for(var i=0;i<nodes.length;i++){nodes[i].removeAttribute('bis_skin_checked');nodes[i].removeAttribute('bis_id');nodes[i].removeAttribute('bis_size');}}strip();var observer=new MutationObserver(function(mutations){for(var i=0;i<mutations.length;i++){var m=mutations[i];if(m.type==='attributes'&&m.attributeName&&m.attributeName.indexOf('bis_')===0){m.target.removeAttribute(m.attributeName);}if(m.addedNodes&&m.addedNodes.length){strip();}}});observer.observe(document.documentElement,{attributes:true,childList:true,subtree:true});})();`,
          }}
        />
        <AuthProvider>
          <AppShell>
            {children}
            <BackToTop />
          </AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
