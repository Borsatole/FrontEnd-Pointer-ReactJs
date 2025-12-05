import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Alerta from "@components/comum/alertas";
import { requisicaoPost } from "@services/requisicoes";
import { useMenu } from "@src/context/MenuContext";
import { Button } from "@components/comum/button";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";

import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

// Alert
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function TelaLogin() {
  const { fecharMenu } = useMenu();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');


  async function verificaLogin(event: any) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dadosFormularioLogin = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      setErrorMessage('');
      const response = await requisicaoPost("/login", dadosFormularioLogin);

      if (response?.data.success && response.data.token) {
        fecharMenu();
        if (response.data.usuario.ativo === false) {
          // console.log("Usuário inativo");
          navigate("/renove");

          login(response.data);
          return;
        } 
        
          login(response.data);
          navigate("/");
          Alerta("swal", "success", `${response.data.message}`);
        
        
        
      } else {
        setErrorMessage(response.data.message);
        // Alerta("swal", "error", `${response?.data?.message || "Ops! Algo deu errado."}`);
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      Alerta("swal", "error", `${error?.response?.data?.message || "Ops! Algo deu errado."}`);
    } finally {
      setLoading(false);
    }
  }

   return (
    <div className="w-screen h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br bg-[var(--base-color)]">
      {/* Padrão de fundo geométrico */}
      <div 
        className="absolute inset-0 opacity-10"
      />

      {/* Container principal com split layout */}
      <div className="relative z-10 flex w-full max-w-4xl h-[600px] rounded-2xl shadow-2xl overflow-hidden bg-[var(--base-variant)]">
        
        {/* Lado esquerdo - Azul com logo */}
        <div className="w-1/2 bg-[var(--corPrincipal)] p-12 flex flex-col items-center justify-between relative overflow-hidden">
          
          {/* Padrão decorativo */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('/wallpaper.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "repeat",
            }}
          />


          {/* Logo */}
          <div className="flex-1 flex items-center justify-center relative z-10"
          
          
          
          >
            <img 
              src="/logo.png"
              alt="TekReja Logo"
              className="w-28 h-auto"
            />
          </div>

          {/* Social e Registro */}
          <div className="relative z-10 text-center">
            <div className="flex justify-center gap-3 mb-6">
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-500 hover:bg-blue-50 transition">
                <FaInstagram />
              </button>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition">
                <FaFacebookF />
              </button>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-500 hover:bg-blue-50 transition">
                <FaWhatsapp />
              </button>
            </div>
            <p className="text-white text-sm">
              Quer saber mais sobre a gente? {' '}
              <button className="font-semibold underline hover:text-blue-100 transition">
                Acesse
              </button>
            </p>
          </div>
        </div>

        {/* Lado direito - Formulário */}
        <div className="w-1/2 bg-[var(--base-variant)] p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Bem Vindo de Volta<br />
            </h2>
            <p>Acesse sua conta</p>
          </div>

          <form onSubmit={verificaLogin} className="space-y-5" id="formLogin">

              <FormGroup id="email" label="Email"> 
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="joan.sterjo@outlook.com"
                  className="w-full"
                  required 
                />
              </FormGroup>

              <FormGroup id="password" label="Senha"> 
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="••••••••"
                  required 
                />
              </FormGroup>

                <Button 
                  type="submit" 
                  loading={loading} 
                  className="w-full font-semibold py-3 rounded-lg transition"
                >
                  LOG IN
                </Button>

            <div className="text-center">
              <button 
                type="button"
                className="text-sm  transition"
              >
                Esqueceu a senha?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
