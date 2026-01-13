import { ReactNode } from "react";

import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { MenuProvider } from "./MenuContext";

import { CondominiosProvider } from "./CondominioContext";

import { ChamadosProvider } from "./ChamadosContext";
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
          <ChamadosProvider>
            <CondominiosProvider>
              <VisitasProvider>
                <VistoriasProvider>
                  <DemandasProvider>{children}</DemandasProvider>
                </VistoriasProvider>
              </VisitasProvider>
            </CondominiosProvider>
          </ChamadosProvider>
        </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
