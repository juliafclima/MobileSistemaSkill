import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.1.159:8080",
});

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

export const getCadastro = () => {
  return axiosInstance.get("/usuario");
};

export const getUsuarioSkill = () => {
  return axiosInstance.get("/usuario-skill");
};

export const putUsuarioSkill = (id: number, novoNivel: string) => {
  return axiosInstance.put(`/usuario-skill/${id}/atualizar-nivel`, {
    novoNivel,
  });
};
