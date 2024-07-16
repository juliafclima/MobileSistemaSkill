import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, TextInput, View } from "react-native";

import Ordenacao from "../../components/filtros/ordenacao";
import { Button } from "../../components/forms/button";
import Header from "../../components/header";
import SearchInput from "../../components/SearchInput";
import {
  deleteUsuarioSkill,
  getUsuarioSkill,
  getUsuarioSkillDesc,
  getUsuarioSkillFiltro,
  putUsuarioSkill,
} from "../../server/UsuarioSkillService";
import ModalAddSkill from "./modal";
import {
  Botao,
  CardContainer,
  CardDescription,
  CardImage,
  CardLevel,
  CardTitle,
  Container,
  ContainerEdicao,
  ContainerFiltros,
  ContainerLixeira,
  ContainerPaginacao,
  FooterEspaco,
  FooterParagrafo,
  MainContainer,
  SaveButton,
  Subtitulo,
  Titulo,
} from "./styles";

type Skill = {
  id: any;
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

  useEffect(() => {
    fetchData();
  }, [page, pageSize, sort]);

  const navigation = useNavigation();

  const { setUsername, setPassword, novoEstado } = route.params;

  const openAddSkillModal = () => {
    setShowAddSkillModal(true);
  };

  const closeAddSkillModal = () => {
    setShowAddSkillModal(false);
  };

  const handleSaveNewSkill = () => {
    fetchUserSkills();
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
      console.error("Error fetching skills:", error);
    }
  };

  const handleLogout = () => {
    if (novoEstado == false) {
      AsyncStorage.removeItem("username");
      AsyncStorage.removeItem("password");
      setUsername("");
      setPassword("");
    }

    AsyncStorage.removeItem("userId");
    navigation.navigate("Login");
  };

  const fetchData = async () => {
    try {
      const response = await getUsuarioSkill(
        page.toString(),
        pageSize.toString(),
        sort
      );

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
      <Header handleLogout={handleLogout} />
      <Container>
        <Titulo>Gerenciamento de Skills</Titulo>

        <ContainerFiltros>
          <SearchInput onSearch={fetchUserSkills} />
          <Ordenacao
            ascending={sort === "asc"}
            onClick={handleChangeOrderClick}
          />
          <Button title="Adicionar" onPress={openAddSkillModal} />
        </ContainerFiltros>

        <ModalAddSkill
          isOpen={showAddSkillModal}
          onClose={closeAddSkillModal}
          onSave={handleSaveNewSkill}
        />

        {userSkills.length === 0 ? (
          <Subtitulo>Deseja adicionar alguma skill?</Subtitulo>
        ) : (
          <MainContainer style={{ marginTop: 40 }}>
            {userSkills.map((skill) => (
              <CardContainer key={skill.id}>
                <ContainerLixeira>
                  <AntDesign
                    name="delete"
                    size={24}
                    color="white"
                    onPress={() => handleDelete(skill.id)}
                  />
                </ContainerLixeira>

                <View style={{ display: "flex", justifyContent: "center" }}>
                  <CardImage src={skill.skill.url} alt="Imagem card" />
                </View>
                <CardTitle>{skill.skill.nome}</CardTitle>
                {editingCardId === skill.id ? (
                  <ContainerEdicao>
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

                    <SaveButton onPress={() => handleSave(skill.id)}>
                      <Ionicons name="save" size={24} color="white" />
                    </SaveButton>
                  </ContainerEdicao>
                ) : (
                  <ContainerEdicao onPress={() => handleEdit(skill.id)}>
                    <View
                      style={{ display: "flex", flexDirection: "row", gap: 10 }}
                    >
                      <CardLevel>Nível {skill.level}/10</CardLevel>
                      <Octicons
                        name="pencil"
                        size={24}
                        color="white"
                        style={{ marginLeft: 10 }}
                      />
                    </View>
                  </ContainerEdicao>
                )}

                <CardDescription>{skill.skill.descricao}</CardDescription>
              </CardContainer>
            ))}
          </MainContainer>
        )}

        <ContainerPaginacao>
          {page > 0 && (
            <Botao onPress={prevPage}>
              <MaterialIcons name="first-page" size={24} color="white" />
            </Botao>
          )}

          {hasNextPage && (
            <Botao onPress={nextPage}>
              <MaterialIcons name="last-page" size={24} color="white" />
            </Botao>
          )}
        </ContainerPaginacao>
        <FooterEspaco />

        <FooterParagrafo>
          © {new Date().getFullYear()} | Desenvolvido por Júlia Lima
        </FooterParagrafo>
      </Container>
    </ScrollView>
  );
}
