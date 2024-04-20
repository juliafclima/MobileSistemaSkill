import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : "";
};

const createAxiosInstance = () => {
  return axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

interface Skill {
  nome: String;
  descricao: String;
  url: String;
}

export const postSkill = (skill: Skill) => {
  const axiosInstance = createAxiosInstance();
  return axiosInstance.post("/skill", skill);
};

export const getSkill = () => {
  const axiosInstance = createAxiosInstance();
  return axiosInstance.post("/skill");
};

export const deleteSkill = (id: number) => {
  const axiosInstance = createAxiosInstance();
  return axiosInstance.post(`/skill/${id}`);
};

export const putSkill = (id: number, skillAtualizada: Skill) => {
  const axiosInstance = createAxiosInstance();
  return axiosInstance.put(`/skill/${id}`, skillAtualizada);
};
