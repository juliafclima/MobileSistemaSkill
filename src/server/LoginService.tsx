import { axiosInstance } from "./api";

interface User {
  login: string;
  senha: string;
}

export const postCadastro = (usuario: User) => {
  return axiosInstance.post("/auth/novoUsuario", usuario);
};

export const postLogin = (username: string, password: string) => {
  return axiosInstance.post("/auth/login", {
    username: username,
    password: password,
  });
};
