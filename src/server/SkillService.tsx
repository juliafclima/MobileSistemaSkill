import { axiosInstance } from "./api";

export const postSkill = (nome: string, descricao: string, url: string) => {
  return axiosInstance.post("/skill", {
    nome: nome,
    descricao: descricao,
    url: url,
  });
};

export const getSkill = (page: number, size: number) => {
  return axiosInstance.get("/skill", {
    params: {
      page: page,
      size: size,
    },
  });
};
