import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Rotas from "./routes";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastContainer />
        <AuthProvider>
          <MenuProvider>
            <Rotas />
          </MenuProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
