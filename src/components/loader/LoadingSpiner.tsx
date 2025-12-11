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
        <div
        style={{
          backgroundColor: "var(--base-color)",
          opacity: "0.5"
        }}
          className="
            absolute inset-0 
            z-50 
            flex items-center justify-center 
            pointer-events-auto 

          "
        >
          <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        </div>
      )}

      <div
        className={
          loading
            ? "pointer-events-none select-none opacity-60"
            : ""
        }
      >
        {children}
      </div>

    </div>
  );
}


export default LoadingSpiner;
