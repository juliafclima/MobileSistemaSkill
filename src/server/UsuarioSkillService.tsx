import { axiosInstance } from "./api";

export const getUsuarioSkill = async (page: any, size: any, sort = "asc") => {
  try {
    const response = await axiosInstance.get("/usuario-skill/paginado-sorted", {
      params: {
        sort: sort,
        page: page,
        size: size,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error na requisição paginado-sorted, getUsuarioSkill:",
      error
    );
    throw error;
  }
};

export const getUsuarioSkillDesc = async (
  page: any,
  size: any,
  sort = "desc"
) => {
  try {
    const response = await axiosInstance.get("/usuario-skill/paginado-sorted", {
      params: {
        sort: sort,
        page: page,
        size: size,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error na requisição paginado-sorted, getUsuarioSkillDesc:",
      error
    );
    throw error;
  }
};

export const getUsuarioSkillFiltro = async (searchTerm: string) => {
  try {
    const response = await axiosInstance.get("/usuario-skill/filtrar", {
      params: {
        nomeSkill: searchTerm,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error na requisição usuario-skill/filtrar, getUsuarioSkillFiltro:",
      error
    );
    throw error;
  }
};

export const putUsuarioSkill = (id: number, novoNivel: string) => {
  return axiosInstance.put(`/usuario-skill/${id}/atualizar-nivel`, {
    novoNivel,
  });
};

export const deleteUsuarioSkill = (id: number) => {
  return axiosInstance.delete(`/usuario-skill/${id}`);
};
