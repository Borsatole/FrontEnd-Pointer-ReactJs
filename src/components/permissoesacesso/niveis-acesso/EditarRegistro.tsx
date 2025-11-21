import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Permissao, Permissoes } from "@src/components/tipos";
import { requisicaoGet } from "@services/requisicoes";
import { Update } from "@src/services/crud2";

interface ModalEditarProdutoProps {
  selectedProduto: Permissoes | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Permissoes | null>>;
  registros: Permissoes[];
  setRegistros: React.Dispatch<React.SetStateAction<Permissoes[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PermissaoCompleta {
  id: number;
  slug: string;
  descricao: string;
  created_at: string;
  updated_at: string;
}

interface PermissoesAgrupadas {
  [categoria: string]: Array<PermissaoCompleta & { allow: boolean }>;
}

function ModalEditarProduto({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setLoadingSpiner,
  setRelistar,
}: ModalEditarProdutoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [todasPermissoes, setTodasPermissoes] = useState<PermissoesAgrupadas>({});

  // Buscar TODAS as permissões disponíveis no sistema
  useEffect(() => {
    if (!selectedProduto) return;

    const buscarPermissoes = async () => {
      try {
        const response = await requisicaoGet('/permissoes');
        
        if (response?.data.success) {
          const permissoesCompletas: PermissaoCompleta[] = response.data.registros;
          
          // Agrupar por categoria (extraída do slug antes do ponto)
          const agrupadas: PermissoesAgrupadas = {};
          
          permissoesCompletas.forEach((perm) => {
            const categoria = perm.slug.split('.')[0]; // Ex: "usuario" de "usuario.criar"
            
            if (!agrupadas[categoria]) {
              agrupadas[categoria] = [];
            }

            // Verificar se esta permissão está ativa no papel atual
            let allow = false;
            if (selectedProduto.permissoes) {
              const permissoesCategoria = selectedProduto.permissoes[categoria as keyof typeof selectedProduto.permissoes];
              if (permissoesCategoria && Array.isArray(permissoesCategoria)) {
                const permAtual = permissoesCategoria.find(
                  (p: Permissao) => p.id === perm.id
                );
                allow = permAtual?.allow || false;
              }
            }

            agrupadas[categoria].push({
              ...perm,
              allow
            });
          });

          setTodasPermissoes(agrupadas);
        }
      } catch (error) {
        console.error('Erro ao buscar permissões:', error);
      } finally {
        setIsLoadingInit(false);
      }
    };

    buscarPermissoes();
  }, [selectedProduto]);

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedProduto) return;
    setSelectedProduto({ ...selectedProduto, nome: e.target.value });
  };

  const handlePermissaoChange = (categoria: string, permissaoId: number, checked: boolean) => {
    setTodasPermissoes(prev => ({
      ...prev,
      [categoria]: prev[categoria].map(p =>
        p.id === permissaoId ? { ...p, allow: checked } : p
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduto?.id) return;

    setIsLoading(true);

    // Coletar todas as permissões com seus estados
    const permissoesArray: Array<{ permissao_id: number; allow: number }> = [];
    
    Object.values(todasPermissoes).forEach(permissoes => {
      permissoes.forEach(perm => {
        permissoesArray.push({
          permissao_id: perm.id,
          allow: perm.allow ? 1 : 0
        });
      });
    });

    const payload = {
      nome: selectedProduto.nome,
      permissoes: permissoesArray
    };

    try {
      Update<any>({
        payload,
        antesDeExecutar: () => {
          setIsLoading(true);
        },
        depoisDeExecutar: () => {
          setRelistar(true);
          setSelectedProduto(null);
          setIsLoading(false);
        },
        endpoint: `/permissoes/${selectedProduto.id}`,
      });
      setSelectedProduto(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fecharModal = () => setSelectedProduto(null);

  if (!selectedProduto) return null;

  // Loading inicial enquanto busca as permissões
  if (isLoadingInit) {
    return (
      <Modal IsOpen={true} onClose={fecharModal}>
        <div className="flex items-center justify-center p-8">
          <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nível */}
        <FormGroup label="Nível" id="nome">
          <Input
            id="nome"
            type="text"
            inputRef={null}
            value={selectedProduto.nome}
            onChange={handleNomeChange}
            required
            disabled={isLoading}
          />
        </FormGroup>

        {/* Lista de TODAS as Permissões por Categoria */}
        <div className="max-h-96 overflow-y-auto">
          {Object.entries(todasPermissoes).map(([categoria, permissoes]) => (
            <div key={categoria} className="mb-4 border-b pb-3">
              <h4 className="font-semibold text-[var(--corPrincipal)] mb-2 capitalize flex items-center gap-2">
                <span className="bg-[var(--corPrincipal)] text-white px-2 py-1 rounded text-xs">
                  {categoria}
                </span>
                <span className="text-xs text-gray-500">
                  ({permissoes.filter(p => p.allow).length}/{permissoes.length})
                </span>
              </h4>

              <div className="space-y-1">
                {permissoes.map((permissao) => (
                  <label
                    key={permissao.id}
                    className="flex items-start space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
                  >
                    <input
                      type="checkbox"
                      checked={permissao.allow}
                      onChange={(e) => handlePermissaoChange(categoria, permissao.id, e.target.checked)}
                      disabled={isLoading}
                      className="accent-[var(--corPrincipal)] cursor-pointer mt-1 flex-shrink-0"
                    />
                    <div className="flex flex-col gap-1 flex-1">
                      <code className="text-xs font-mono text-[var(--corPrincipal)] bg-gray-100 px-2 py-0.5 rounded inline-block w-fit">
                        {permissao.slug}
                      </code>
                      <span className="text-sm text-gray-600">{permissao.descricao}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Botão de Salvar */}
        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          wsize="w-full mt-6"
        >
          Salvar Alterações
        </Button>
      </form>
    </Modal>
  );
}

export default ModalEditarProduto;