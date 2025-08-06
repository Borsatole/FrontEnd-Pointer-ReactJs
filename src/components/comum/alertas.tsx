import { toast } from "react-toastify";
import Swal from "sweetalert2";



type Alerta = (alerta?: string, tipo?: string, mensagem?: string) => void;

function Alerta(alerta = "toast", tipo = "success", mensagem = "") {
  
  if (alerta === "toast" && tipo === "success") {
    toast.success(mensagem, {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  if (alerta === "toast" && tipo === "error") {
    toast.error(mensagem, {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  if (alerta === "swal" && tipo === "success") {
    Swal.fire({
      icon: tipo,
      title: mensagem,
      showConfirmButton: true,
    });
  }

  if (alerta === "swal" && tipo === "error") {
    Swal.fire({
      icon: tipo,
      title: mensagem,
      showConfirmButton: true,
      timer: 1500,
    });
  }
}

export default Alerta;
