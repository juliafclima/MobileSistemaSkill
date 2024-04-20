import React, { createContext, useState } from "react";

import { UsuarioService } from "@/services/UsuarioService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pessoas, setPessoas] = useState(null);
  const [loading, setLoading] = useState(false);

  const usuarioService = new UsuarioService();

 /*  useEffect(() => {
    usuarioService.listarTodos
      .then(response => {
        setPessoas(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar pessoas:", error);
      });
  }, []); */

  const signin = (username, password) => {
    const pessoaEncontrada = pessoas.find(
      login => login.username === username && login.password === password,
    );

    if (pessoaEncontrada) {
      console.log("Usuário logado");
      setUser({ user: pessoaEncontrada.username });
    } else {
      console.log("Usuário não encontrado");
      alert("Senha inválida!");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
