import { formatarDinheiro } from "@src/utils/dinheiro";
import Progressbar from "@src/components/financeiro/Progressbar";

type CategoriasProps = {
  entrada?: Record<string, number>;
  saida?: Record<string, number>;
};

type Props = {
  categorias: CategoriasProps;
};

export default function ListarCategorias({ categorias }: Props) {
  const entradas = categorias?.entrada ?? {};
  const saidas = categorias?.saida ?? {};

  const totalEntradas = Object.values(entradas).reduce(
    (acc, v) => acc + Number(v),
    0,
  );

  const totalSaidas = Object.values(saidas).reduce(
    (acc, v) => acc + Number(v),
    0,
  );

  const pct = (valor: number, total: number) =>
    total === 0 ? "0%" : `${Math.round((valor / total) * 100)}%`;

  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* ENTRADAS */}
      {Object.keys(entradas).length > 0 && (
        <div className="rounded-xl bg-[var(--base-color)] border border-[var(--base-variant)] overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4">
            <span className="w-2 h-2 rounded-full bg-green-700 flex-shrink-0" />
            <span className="text-xs font-medium tracking-widest uppercase">
              Entradas
            </span>
            <span className="ml-auto text-xs font-medium bg-green-50 text-green-800 px-3 py-0.5 rounded-full">
              {formatarDinheiro(totalEntradas)}
            </span>
          </div>

          {Object.entries(entradas).map(([categoria, valor]) => (
            <div
              key={categoria}
              className="flex justify-between items-center px-5 py-3 border-b border-gray-50 last:border-b-0"
            >
              <div className="flex-1 mr-4">
                <div className="flex items-baseline gap-1.5">
                  <p className="text-sm">{categoria}</p>
                  <span className="text-xs text-gray-400">
                    {pct(Number(valor), totalEntradas)}
                  </span>
                </div>

                <Progressbar
                  progress={
                    totalEntradas > 0 ? Number(valor) / totalEntradas : 0
                  }
                  color="green"
                />
              </div>

              <span className="text-sm font-medium text-green-700 whitespace-nowrap">
                {formatarDinheiro(Number(valor))}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* SAÍDAS */}
      {Object.keys(saidas).length > 0 && (
        <div className="rounded-xl bg-[var(--base-color)] border border-[var(--base-variant)] overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4">
            <span className="w-2 h-2 rounded-full bg-red-700 flex-shrink-0" />
            <span className="text-xs font-medium tracking-widest uppercase">
              Saídas
            </span>
            <span className="ml-auto text-xs font-medium bg-red-50 text-red-800 px-3 py-0.5 rounded-full">
              {formatarDinheiro(totalSaidas)}
            </span>
          </div>

          {Object.entries(saidas).map(([categoria, valor]) => (
            <div
              key={categoria}
              className="flex justify-between items-center px-5 py-3 border-b border-gray-50 last:border-b-0"
            >
              <div className="flex-1 mr-4">
                <div className="flex items-baseline gap-1.5">
                  <p className="text-sm">{categoria}</p>
                  <span className="text-xs text-gray-400">
                    {pct(Number(valor), totalSaidas)}
                  </span>
                </div>

                <Progressbar
                  progress={totalSaidas > 0 ? Number(valor) / totalSaidas : 0}
                  color="red"
                />
              </div>

              <span className="text-sm font-medium text-red-700 whitespace-nowrap">
                {formatarDinheiro(Number(valor))}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
