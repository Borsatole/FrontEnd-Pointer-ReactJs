import { useEffect, useState } from "react";
import { Card, Spinner, Tabs, TabItem } from "flowbite-react";
import { 
  FaBuilding, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaClipboardList,
  FaHeadset,
  FaUserCheck,
  FaEdit
} from "react-icons/fa";
import dayjs from "dayjs";
import CardOrders from "@src/components/comum/StatsLte";
import { requisicaoGet, requisicaoPost, requisicaoPut } from "@src/services/requisicoes";
import LoadingSpiner from "@src/components/loader/LoadingSpiner";
import LoadingSkeleton from "@src/components/loader/LoadingSkeleton";
import { useParams } from "react-router-dom";
import { Condominio } from "@src/components/tipos";
import { FormGroup } from "@src/components/comum/FormGroup";
import { Input } from "@src/components/comum/input";
import ContainerSecundario from "@src/components/comum/containerSecundario";
import Alerta from "@src/components/comum/alertas";
import { Button } from "@src/components/comum/button";

// Exemplo com dados mockados para demonstração
export default function PaginaCondominio() {
  const { id } = useParams();
  const [registros, setRegistros] = useState<Condominio>();

  const [relistar, setRelistar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  

  // Dados do condominio
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rua, setRua] = useState('');

  // Dados Cards
  const [visitas, setVisitas] = useState(0);
  const [chamados, setChamados] = useState(0);
  const [vistorias, setVistorias] = useState(0);

  useEffect(() => {
  let isMounted = true;

  async function carregar() {
    try {
      setLoadingSpiner(true);
      const response = await requisicaoGet(`/condominios/${id}`);

      if (!isMounted) return;

      if (response?.data.success) {
        setNome(response.data.registro.nome);
        setTelefone(response.data.registro.telefone);
        setRua(response.data.registro.rua);
        setRegistros(response.data.registro);
      } else {
        setErro(response.data.message || "Erro ao carregar dados");
      }
    } catch (e) {
      if (isMounted) setErro("Erro na requisição");
      console.log(e);
    } finally {
      setRelistar(false);
      setLoadingSpiner(false);
      if (isMounted) setLoading(false);
    }
  }

  carregar();

  return () => {
    isMounted = false;
  };
  }, [id, relistar]);

  

  async function enviarDados(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
    nome: nome,
    telefone: telefone,
    rua: rua
  };

   try {
    const response = await requisicaoPut(`/condominios/${id}`, payload);

    if (response?.data.success) {
      Alerta("toast", "success", response.data.message);
      setRelistar(true);
    }
    
   } catch (e) {
    console.log(e);
   }
    
  }


  
  
  if (loading) return <LoadingSkeleton />;
  if (erro) return <>{erro}</>;
  if (!registros) return;
  
  return (
    <ContainerSecundario>
    <LoadingSpiner loading={loadingSpiner}>
    <div className="h-screen w-full">
      <div className="max-w-7xl space-y-6 ">
        
        {/* Header redesenhado inspirado na imagem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          
          {/* Card de Perfil/Identificação */}
          <Card className="lg:col-span-4 shadow-lg border-0 bg-[var(--base-variant)]">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Avatar/Logo do Condomínio */}
              <div className="w-32 h-32 rounded-full bg-[#03a664] flex items-center justify-center shadow-xl">
                <FaBuilding className="text-5xl text-white" />
              </div>
              
              {/* Nome do Condomínio */}
              <div>
                <h1 className="text-2xl font-bold">
                  {registros.nome || "-"}
                </h1>
                
              </div>
              

              
              {/* Informações Principais */}
              <div className="w-full pt-4 border-t border-gray-200 space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Endereço:</span>
                  <span className="text-sm font-semibold">Principal</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                  <span className="text-sm ">{registros.rua || "-"}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm ">Telefone:</span>
                  <span className="text-sm ">{registros.telefone || "-"}</span>
                </div>
                
              
                
                
              </div>
            </div>
          </Card>
          
          {/* Área de Estatísticas e Detalhes */}
          <div className="lg:col-span-8 space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <CardOrders 
              titulo="visitas"
              valor={visitas}
              cor="#03a664"
              corRodape="#228572"
              icone={<FaUserCheck className="text-5xl text-white" />}
              onClick={() => {}}
            />

             <CardOrders 
              titulo="chamados"
              valor={chamados}
              cor="#ff840b"
              corRodape="#bc6209"
              icone={<FaHeadset className="text-5xl text-white" />}
              onClick={() => {}}
            />

            <CardOrders
              titulo="vistorias"
              valor={vistorias || 0}
              cor="#ff0b0b"
              corRodape="#bc6209"
              corRodapeHover="#bc0909"
              icone={<FaClipboardList className="text-5xl text-white" />}
              onClick={() => {}}
            />
            
          </div>


            
            <form className="bg-[var(--base-variant)] p-6 rounded-lg shadow-md w-full space-y-6" onSubmit={(e) => enviarDados(e)}>

              {/* Grid 2 colunas no desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <FormGroup label="Nome" id="nome">
                  <Input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite o nome"
                    className="w-full"
                  />
                </FormGroup>

                <FormGroup label="Telefone" id="telefone">
                  <Input
                    id="telefone"
                    type="text"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Digite o telefone"
                    className="w-full"
                  />
                </FormGroup>

              </div>

              <FormGroup label="Endereço" id="endereco" className="w-full">
                <Input
                  id="endereco"
                  type="text"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  placeholder="Digite o endereço"
                  className="w-full"
                />
              </FormGroup>

              {/* Botão */}
              <div className="flex justify-end pt-2">
                <Button onClick={enviarDados} loading={loadingSpiner} className="mb-3">
                  Salvar Alterações
                </Button>
                {/* <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 transition text-white font-semibold px-6 py-2 rounded-lg shadow"
                >
                  Salvar Alterações
                </button> */}
              </div>

            </form>


          </div>
          
        </div>

        

      </div>
    </div>
    </LoadingSpiner>
    </ContainerSecundario>
  );
}

