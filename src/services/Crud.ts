// import { requisicaoDelete, requisicaoPost, requisicaoPut } from "@services/requisicoes";
// import Alerta from "@components/comum/alertas";
// import { Confirm } from "@components/comum/alertas";


// // 🔹 Tipo base para registros (cada tabela pode estender)
// export interface BaseRegistro {
//   id?: number | string;
//   nome?: string; // usado em mensagens amigáveis
//   [key: string]: any;
// }

// // ----------- DELETE -----------
// interface Deletar<T extends BaseRegistro> {
//   registro: T;
//   setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
//   endpoint: string; // ex: "/Estoque/categoria/deletar-categoria.php"
// }

// export function handleDeletar<T extends BaseRegistro>({
//   registro,
//   setRelistar,
//   endpoint,
// }: Deletar<T>) {

//   const executarDelete = async () => {
//     try {
//       const response = await requisicaoDelete(`${endpoint}`);
//       if (response?.data?.success) {
//         Alerta("toast", "success", "Registro deletado com sucesso!");
//         setRelistar(true); // atualiza tabela só se deletar com sucesso
//       }
//     } catch (error) {
//       Alerta("toast", "error", "Não foi possível deletar o registro.");
//     }
//   };

//   Confirm({
//     onConfirm: () => executarDelete(), 
//     onCancel: () => {},
//     text: `Tem certeza que deseja deletar ${registro.nome ?? "esse registro"}?`});
// }

// // ----------- EDIT -----------
// interface Editar<T extends BaseRegistro> {
//   data: T | FormData;
//   setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
//   setSelected: React.Dispatch<React.SetStateAction<T | null>>;
//   setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
//   registros: T[];
//   setRegistros: React.Dispatch<React.SetStateAction<T[]>>;
//   endpoint: string;
// }

// export async function editarRegistro<T extends BaseRegistro>({
//   data,
//   setRelistar,
//   setSelected,
//   setLoadingSpiner,
//   registros,
//   setRegistros,
//   endpoint,
// }: Editar<T>) {
//   setLoadingSpiner(true);
//   try {
//     const response = await requisicaoPut(endpoint, data);
//     const msg = response?.data?.message ?? "Erro ao editar a requisição!";

//     if (response?.data?.success) {
//       // setRegistros(registros.map((r) => (r.id === data.id ? data : r)));
//       setSelected(null);
//       setRelistar(true);
      
//       Alerta("toast", "success", msg);
//     } 
//   } catch(error : any) {
//     Alerta("toast", "error", `${error?.response?.data?.message}`);
    
//   } finally {
//     setLoadingSpiner(false);
//   }
// }

// export async function editarRegistroComImagens<T extends BaseRegistro>({
//   data,
//   setRelistar,
//   setSelected,
//   setLoadingSpiner,
//   registros,
//   setRegistros,
//   endpoint,
// }: Editar<T>) {
//   setLoadingSpiner(true);
//   try {
//     const response = await requisicaoPost(endpoint, data);
//     const msg = response?.data?.message ?? "Erro ao editar a requisição!";

//     if (response?.data?.success) {
//       // setRegistros(registros.map((r) => (r.id === data.id ? data : r)));
//       // setSelected(null);
//       setRelistar(true);
//       Alerta("toast", "success", msg);
//     } else {
//       Alerta("toast", "error", msg);
//       setRelistar(true);
//     }
//   } catch {
//     Alerta("toast", "error", "Erro inesperado ao editar a requisição!");
//     setRelistar(true);
//   } finally {
//     setLoadingSpiner(false);
//   }
// }


// // ----------- CREATE -----------
// interface Novo<T extends BaseRegistro> {
//   data: T | FormData;
//   registros?: T[];
//   setRegistros?: React.Dispatch<React.SetStateAction<T[]>>;
//   setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
//   setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
//   setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
//   endpoint: string; // ex: "/Estoque/categoria/adicionar-categoria.php"
// }

// export function adicionarRegistro<T extends BaseRegistro>({
//   data,
//   setRegistros,
//   setRelistar,
//   setAbrirModalNovoRegistro,
//   setLoadingSpiner,
//   endpoint,
// }: Novo<T>) {
//   if (!data) return;
//   setLoadingSpiner(true);

//   requisicaoPost(endpoint, data)
//     .then((response) => {
//       const msg = response?.data?.message ?? "Erro ao criar a requisição!";
      
//       if (response?.data?.success) {
//         // Verifica se foi uma requisição ignorada pelo backend
//         if (response?.data?.ignored) {
//           console.log("Requisição ignorada pelo backend:", msg);
//           // Não mostra toast de erro, apenas ignora silenciosamente
//           return;
//         }
        
//         Alerta("toast", "success", msg);
//         setRelistar(true);
//         setAbrirModalNovoRegistro(false);
//       } 
//     })
//     .catch((error) => {
//       Alerta("toast", "error", `${error.response.data.message}`);
//     })
//     .finally(() => {
//       setLoadingSpiner(false);
//     });
// }