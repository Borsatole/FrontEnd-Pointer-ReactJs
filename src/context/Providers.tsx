import { ReactNode } from "react";

import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { MenuProvider } from "./MenuContext";

import { CondominiosProvider } from "./CondominioContext";

import { ClientesProvider } from "./ClientesContext";
import { EstoqueProvider } from "./EstoqueContext";
import { DemandasProvider } from "./DemandasContext";
import { VisitasProvider } from "./VisitasContext";
import { VistoriasProvider } from "./VistoriasContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MenuProvider>
          <ClientesProvider>
            <CondominiosProvider>
              <VisitasProvider>
                <VistoriasProvider>
                  <DemandasProvider>{children}</DemandasProvider>
                </VistoriasProvider>
              </VisitasProvider>
            </CondominiosProvider>
          </ClientesProvider>
        </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
