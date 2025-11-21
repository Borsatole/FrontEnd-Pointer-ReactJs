import React from 'react';
import { Spinner } from 'flowbite-react';

interface Props {
  children: React.ReactNode;
  loading: boolean;
}

function LoadingSpiner({ children, loading }: Props) {

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto bg-[rgb(255,255,255)] opacity-50" aria-readonly >
          <Spinner size="xl" className=" fill-[var(--corPrincipal)]" />

        </div>
      )}
      
      <div className={loading ? 'pointer-events-none opacity-50' : ''}>
        {children}
      </div>
    </div>
  );
}

export default LoadingSpiner;
