import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Button } from "../../components/forms/button";
import { putUsuarioSkill } from "../../services/LoginService";
import ModalAddSkill from "./modal";
import {
  CardContainer,
  CardDescription,
  CardImage,
  CardLevel,
  CardTitle,
  Container,
  ContainerEdicao,
  MainContainer,
  SaveButton,
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

  const navigation = useNavigation();

  const { setUsername, setPassword, novoEstado } = route.params;

  const openAddSkillModal = () => {
    setShowAddSkillModal(true);
  };

  const closeAddSkillModal = () => {
    setShowAddSkillModal(false);
  };

  const handleSaveNewSkill = async () => {
    await fetchUserSkills();
  };

  const fetchUserSkills = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.159:8080/usuario-skill`,
      );

      const userID = await AsyncStorage.getItem("userId");

      const userSkillsFiltered = response.data.filter(
        (skill: Skill) => skill.usuario.id === Number(userID),
      );

      setUserSkills(userSkillsFiltered);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchUserSkills();
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.159:8080/usuario-skill`,
        );

        const userID = await AsyncStorage.getItem("userId");

        if (userID && !isNaN(Number(userID))) {
          const userSkillsFiltered = response.data.filter(
            (skill: Skill) => skill.usuario.id === Number(userID),
          );
          setUserSkills(userSkillsFiltered);
        } else {
          console.error("userId is not valid:", userID);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    setNovoNivel(userSkills.find(skill => skill.id === id)?.level || "");
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

      const updatedSkills = userSkills.map(skill => {
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
    await axios.delete(`http://192.168.1.159:8080/usuario-skill/${id}`);

    const updatedSkills = userSkills.filter(skill => skill.id !== id);
    setUserSkills(updatedSkills);

    if (editingCardId === id) {
      setEditingCardId(null);
    }

    Alert.alert("Card removido com sucesso!");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#121214" }}>
      <Container style={{ paddingTop: 40 }}>
        <Text
          style={{
            textAlign: "center",
            color: "#f1f1f1",
            fontSize: 20,
            fontWeight: "bolder",
          }}
        >
          Gerenciamento de Skills
        </Text>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Button title="Adicionar Skill" onPress={openAddSkillModal} />
          <Button title="Sair" onPress={handleLogout} />
        </View>

        <ModalAddSkill
          isOpen={showAddSkillModal}
          onClose={closeAddSkillModal}
          onSave={handleSaveNewSkill}
        />

        {userSkills.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              color: "#f1f1f1",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 40,
            }}
          >
            Deseja adicionar alguma skill?
          </Text>
        ) : (
          <MainContainer style={{ marginTop: 40 }}>
            {userSkills.map(skill => (
              <CardContainer key={skill.id}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <AntDesign
                    name="delete"
                    size={24}
                    color="white"
                    onPress={() => handleDelete(skill.id)}
                  />
                </View>

                <View style={{ display: "flex", justifyContent: "center" }}>
                  <CardImage src={skill.skill.url} alt="" />
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
      </Container>
    </ScrollView>
  );
}
