'use client';

import Link from 'next/link';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="id">
      <body 
        className="bg-[#141414] text-white antialiased"
        style={{ 
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="flex flex-col items-center justify-center text-center px-4 max-w-md">
          {/* Error Icon */}
          <div 
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'rgba(229, 9, 20, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#e50914"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h1 
            style={{ 
              fontSize: 28, 
              fontWeight: 'bold', 
              marginBottom: 8,
              color: '#e50914',
            }}
          >
            Error Sistem
          </h1>
          
          <p 
            style={{ 
              fontSize: 16, 
              color: '#a3a3a3',
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Terjadi kesalahan kritis pada aplikasi. Silakan coba lagi atau kembali ke halaman utama.
          </p>
          
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: 'white',
                color: 'black',
                fontWeight: 'bold',
                padding: '12px 24px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                minWidth: 120,
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e5e5'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Coba Lagi
            </button>
            
            <Link
              href="/"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                fontWeight: 'bold',
                padding: '12px 24px',
                borderRadius: 6,
                border: '1px solid #333',
                cursor: 'pointer',
                fontSize: 14,
                minWidth: 120,
                textDecoration: 'none',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              Ke Beranda
            </Link>
          </div>

          {/* Error digest */}
          {error.digest && (
            <p 
              style={{ 
                marginTop: 32, 
                fontSize: 12, 
                color: '#666',
                fontFamily: 'monospace',
              }}
            >
              Kode: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
