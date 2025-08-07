import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BarraSuperior from "../components/barraSuperior";
import Alerta from "../components/comum/alertas";
import { requisicaoPost } from "../services/requisicoes";
import { FormGroup } from "../components/comum/FormGroup";
import { Input } from "../components/comum/input";
import { Button } from "../components/comum/button";

export default function TelaLogin() {
      
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function verificaLogin(event : any) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const dadosFormularioLogin = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      const response = await requisicaoPost(
        "/Auth/login.php",
        dadosFormularioLogin
      );

      if (response?.data.success && response.data.JWT) {

        Alerta("swal", "success", `${response.data.message}`);

        // Chama a função login do contexto
        login(response.data.JWT);


        // Redireciona para o Dashboard
        navigate("/dashboard");
      } else {
        console.log(response);
        Alerta("swal", "error", `${response?.data?.message || "Ops! Algo deu errado."}`);
      }
    } catch (error) {
      console.log(error);
      Alerta("swal", "error", `Ops! Algo deu errado.`);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <BarraSuperior />
      <div className="h-full">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
              Acesse sua conta
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              action="http://localhost/Backend/Auth/login.php"
              method="POST"
              className="space-y-6"
              id="formLogin"
              onSubmit={verificaLogin}
            >
              <div>
                <FormGroup label="E-mail" id="email">
                  <Input id="email" name="email" type="email" required />
                </FormGroup>

                <FormGroup label="Senha" id="password">
                  <Input id="password" name="password" type="password" required />
                </FormGroup>
                
                
              </div>
              
              <div>
                <Button className="" type="submit" loading={loading} wsize="w-full" >Entrar</Button>
                
              </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Não tem cadastro?{" "}
              <a
                href="#"
                className="font-semibold text-[var(--corPrincipal)] hover:text-[var(--corPrincipalHover)]"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
