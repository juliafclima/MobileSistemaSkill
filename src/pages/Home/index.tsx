import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StatusBar, TextInput, View } from "react-native";

import Ordenacao from "../../components/filtros/ordenacao";
import { Button } from "../../components/forms/button";
import Header from "../../components/header";
import SearchInput from "../../components/SearchInput";
import ModalAddSkill from "../../components/skills/adicionarSkill/modal";
import {
  deleteUsuarioSkill,
  getUsuarioSkill,
  getUsuarioSkillDesc,
  getUsuarioSkillFiltro,
  putUsuarioSkill,
} from "../../server/UsuarioSkillService";
import * as H from "./styles";

type Skill = {
  id: number;
  level: string;
  usuario: {
    id: number;
    login: string;
    senha: string;
    situacao: string;
  };
  skill: {
    id: number;
    nome: string;
    descricao: string;
    url: string;
  };
};

export default function Home({ route }: any) {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [novoNivel, setNovoNivel] = useState("");
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, [page, pageSize, sort]);

  const fetchData = async () => {
    try {
      let response;

      if (sort === "asc") {
        response = await getUsuarioSkill(page.toString(), pageSize.toString());
      } else {
        response = await getUsuarioSkillDesc(
          page.toString(),
          pageSize.toString()
        );
      }

      if (!response || !Array.isArray(response.content)) {
        console.error("fetchData - Resposta da API inválida:", response);
        return;
      }

      const userID = await AsyncStorage.getItem("userId");
      const userSkillsFiltered = response.content.filter(
        (skill: Skill) => skill.usuario.id === Number(userID)
      );

      setUserSkills(userSkillsFiltered);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const fetchUserSkills = async (searchTerm?: string) => {
    try {
      let response;

      if (searchTerm) {
        response = await getUsuarioSkillFiltro(searchTerm);
      } else {
        if (sort === "asc") {
          response = await getUsuarioSkill(
            page.toString(),
            pageSize.toString()
          );
        } else {
          response = await getUsuarioSkillDesc(
            page.toString(),
            pageSize.toString()
          );
        }
      }

      if (!response || !Array.isArray(response.content)) {
        console.error("fetchUserSkills - Resposta da API inválida:", response);
        return;
      }

      const userID = await AsyncStorage.getItem("userId");

      const userSkillsFiltered = response.content.filter(
        (skill: Skill) => skill.usuario.id === Number(userID)
      );

      setUserSkills(userSkillsFiltered);
    } catch (error) {
      console.error("Erro ao buscar habilidades:", error);
    }
  };

  const handleEdit = (id: number) => {
    setNovoNivel(userSkills.find((skill) => skill.id === id)?.level || "");
    setEditingCardId(id);
  };

  const handleSave = async (id: number) => {
    try {
      if (novoNivel.trim() === "") {
        Alert.alert("Campo de atualização de nível vazio.");
        return;
      }

      const novoNivelNumber = parseFloat(novoNivel);
      if (
        isNaN(novoNivelNumber) ||
        novoNivelNumber < 0 ||
        novoNivelNumber > 10
      ) {
        Alert.alert("O nível deve estar entre 0 e 10.");
        return;
      }

      await putUsuarioSkill(id, novoNivel);

      const updatedSkills = userSkills.map((skill) => {
        if (skill.id === id) {
          return { ...skill, level: novoNivel };
        }
        return skill;
      });
      setUserSkills(updatedSkills);

      setEditingCardId(null);
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteUsuarioSkill(id);

    const updatedSkills = userSkills.filter((skill) => skill.id !== id);
    setUserSkills(updatedSkills);

    if (editingCardId === id) {
      setEditingCardId(null);
    }

    Alert.alert("Card removido com sucesso!");
  };

  const handleChangeOrderClick = async () => {
    try {
      const newSortOrder = sort === "asc" ? "desc" : "asc";
      setSort(newSortOrder);
      setPage(0);

      let response;
      if (newSortOrder === "asc") {
        response = await getUsuarioSkill("0", pageSize.toString());
      } else {
        response = await getUsuarioSkillDesc("0", pageSize.toString());
      }

      if (!response || !Array.isArray(response.content)) {
        console.error(
          `Resposta inválida ao alterar ordem para ${newSortOrder}:`,
          response
        );
        return;
      }

      const userID = await AsyncStorage.getItem("userId");

      const userSkillsFiltered = response.content.filter(
        (skill: Skill) => skill.usuario.id === Number(userID)
      );

      setUserSkills(userSkillsFiltered);
    } catch (error) {
      console.error("Erro ao alterar ordem:", error);
    }
  };

  const openAddSkillModal = () => setShowAddSkillModal(true);

  const closeAddSkillModal = () => setShowAddSkillModal(false);

  const handleSaveNewSkill = () => {
    fetchUserSkills();
  };

  const handleLogout = () => {
    AsyncStorage.removeItem("username");
    AsyncStorage.removeItem("password");
    AsyncStorage.removeItem("userId");

    navigation.navigate("Login");
  };

  const hasNextPage = userSkills.length === pageSize;

  const nextPage = () => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#121214" }}>
      <StatusBar />
      <Header handleLogout={handleLogout} />
      <H.Container>
        <H.Titulo>Gerenciamento de Skills</H.Titulo>

        <H.ContainerFiltros>
          <SearchInput onSearch={fetchUserSkills} />
          <Ordenacao
            ascending={sort === "asc"}
            onClick={handleChangeOrderClick}
          />
          <Button title="Adicionar" onPress={openAddSkillModal} />
        </H.ContainerFiltros>

        <ModalAddSkill
          isOpen={showAddSkillModal}
          onClose={closeAddSkillModal}
          onSave={handleSaveNewSkill}
        />

        {userSkills.length === 0 ? (
          <H.Subtitulo style={{ color: "white" }}>
            Deseja adicionar alguma skill?
          </H.Subtitulo>
        ) : (
          <H.MainContainer style={{ marginTop: 40 }}>
            {userSkills.map((skill) => (
              <H.CardContainer key={skill.id}>
                <H.ContainerLixeira>
                  <AntDesign
                    name="delete"
                    size={24}
                    color="white"
                    onPress={() => handleDelete(skill.id)}
                  />
                </H.ContainerLixeira>

                <View style={{ display: "flex", justifyContent: "center" }}>
                  <H.CardImage src={skill.skill.url} alt="Imagem card" />
                </View>
                <H.CardTitle>{skill.skill.nome}</H.CardTitle>
                {editingCardId === skill.id ? (
                  <H.ContainerEdicao>
                    <TextInput
                      style={{
                        backgroundColor: "white",
                        borderRadius: 19,
                        padding: 3,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 10,
                      }}
                      value={novoNivel}
                      onChangeText={setNovoNivel}
                      placeholder="Novo nível"
                      keyboardType="numeric"
                    />

                    <H.SaveButton onPress={() => handleSave(skill.id)}>
                      <Ionicons name="save" size={24} color="white" />
                    </H.SaveButton>
                  </H.ContainerEdicao>
                ) : (
                  <H.ContainerEdicao onPress={() => handleEdit(skill.id)}>
                    <View
                      style={{ display: "flex", flexDirection: "row", gap: 10 }}
                    >
                      <H.CardLevel>Nível {skill.level}/10</H.CardLevel>
                      <Octicons
                        name="pencil"
                        size={24}
                        color="white"
                        style={{ marginLeft: 10 }}
                      />
                    </View>
                  </H.ContainerEdicao>
                )}

                <H.CardDescription>{skill.skill.descricao}</H.CardDescription>
              </H.CardContainer>
            ))}
          </H.MainContainer>
        )}

        <H.ContainerPaginacao>
          {page > 0 && (
            <H.Botao onPress={prevPage}>
              <MaterialIcons name="first-page" size={24} color="white" />
            </H.Botao>
          )}

          {hasNextPage && (
            <H.Botao onPress={nextPage}>
              <MaterialIcons name="last-page" size={24} color="white" />
            </H.Botao>
          )}
        </H.ContainerPaginacao>
        <H.FooterEspaco />

        <H.FooterParagrafo>
          © {new Date().getFullYear()} | Desenvolvido por Júlia Lima
        </H.FooterParagrafo>
      </H.Container>
    </ScrollView>
  );
}
