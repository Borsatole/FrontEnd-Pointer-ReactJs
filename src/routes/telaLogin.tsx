import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Alerta from "@components/comum/alertas";
import { requisicaoPost } from "@services/requisicoes";
import { FormGroup } from "@components/comum/FormGroup";
import { Input } from "@components/comum/input";
import { Button } from "@components/comum/button";
import { useMenu } from "@src/context/MenuContext";


export default function TelaLogin() {
  const { fecharMenu } = useMenu();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function verificaLogin(event: any) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dadosFormularioLogin = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      const response = await requisicaoPost("/Auth/login.php", dadosFormularioLogin);

      if (response?.data.success && response.data.JWT) {
        Alerta("swal", "success", `${response.data.message}`);
        fecharMenu();
        login(response.data.JWT);
        navigate("/");
      } else {
        Alerta("swal", "error", `${response?.data?.message || "Ops! Algo deu errado."}`);
      }
    } catch (error) {
      Alerta("swal", "error", `Ops! Algo deu errado.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen relative flex items-center justify-center overflow-hidden">
      {/* Fundo animado */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-panZoom"
        style={{
          backgroundColor: "var(--base-color)",
        }}
      />

      {/* Overlay escuro sutil */}
      <div className="absolute inset-0" />

      {/* Card central */}
      <div className="relative z-10 w-full max-w-md p-12 rounded-2xl shadow-2xl bg-[var(--base-variant)] backdrop-blur-md">

        <h2 className="text-3xl font-bold text-center text-[var(--text-color)] mb-8">
          Acesse sua conta
        </h2>

        <div className="flex items-center justify-center mb-6 cursor-pointer">
        <div className="w-full  flex justify-center max-w-[100%] p-3 bg-[var(--base-color)] rounded-lg backdrop-blur-sm">
          <img 
            src={`/logo.png`}  
            className="w-[60%] border-rounded-full h-auto object-contain max-w-[40%]" 
            alt="Logo" 
            
          />
        </div>
      </div>


        
        
        <form onSubmit={verificaLogin} className="space-y-6" id="formLogin">
          <FormGroup label="E-mail" id="email">
            <Input id="email" name="email" type="email" required />
          </FormGroup>
          <FormGroup label="Senha" id="password">
            <Input id="password" name="password" type="password" required />
          </FormGroup>
          <Button type="submit" loading={loading} className="w-full">
            Entrar
          </Button>
        </form>
      </div>

      
    </div>
  );
}
