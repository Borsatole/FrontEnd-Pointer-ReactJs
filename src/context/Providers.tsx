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
import { TabelaProvider } from "@src/components/comum/Tabelas/TabelaContext";

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
                  <TabelaProvider>
                    <DemandasProvider>{children}</DemandasProvider>
                  </TabelaProvider>
                </VistoriasProvider>
              </VisitasProvider>
            </CondominiosProvider>
          </ChamadosProvider>
        </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
