import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Popup } from "react-native-popup-confirm-toast";

import {
  Container,
  MainContainer,
  CardContainer,
  CardImage,
  CardTitle,
  ContainerEdicao,
  InputField,
  SaveButton,
  CardLevel,
  CardDescription,
} from "@/pages/Home/styles";
import { Button } from "@/components/forms/button";
import axios from "axios";
import { putUsuarioSkill } from "@/services/LoginService";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default function Home() {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [novoNivel, setNovoNivel] = useState("0/10");
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);

  const navigation = useNavigation();

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

      console.log("resposta data fetchUserSkills ", response.data);

      const userID = await AsyncStorage.getItem("userId");
      console.log("userid home", userID);

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
    AsyncStorage.removeItem("userId");
    navigation.navigate("Login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.159:8080/usuario-skill`,
        );

        const userID = Number(AsyncStorage.getItem("userId"));

        const userSkillsFiltered = response.data.filter(
          (skill: Skill) => skill.usuario.id === userID,
        );

        setUserSkills(userSkillsFiltered);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    setNovoNivel(userSkills.find(skill => skill.id === id)?.level || "0/10");
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
    try {
      Popup.show({
        type: "confirm",
        title: "Deseja realmente apagar este card?",
        textBody: "Essa ação não pode ser revertida!",
        buttonText: "Sim, apagar!",
        confirmText: "Cancelar",
        callback: async () => {
          try {
            await axios.delete(`http://192.168.1.159:8080/usuario-skill/${id}`);

            const updatedSkills = userSkills.filter(skill => skill.id !== id);
            setUserSkills(updatedSkills);

            if (editingCardId === id) {
              setEditingCardId(null);
            }

            Alert.alert("Card removido com sucesso!");
          } catch (error) {
            Alert.alert("Algo aconteceu! Não foi possível apagar.");
          } finally {
            Popup.hide();
          }
        },
        cancelCallback: () => {
          Popup.hide();
        },
      });
    } catch (error) {
      Alert.alert("Algo aconteceu! Não foi possível apagar.");
    }
  };

  return (
    <ScrollView>
      <Container>
        <Text style={{ textAlign: "center" }}>Gerenciamento de Skills</Text>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Button title="Adicionar Skill" onPress={openAddSkillModal} />
          <Button title="Sair" onPress={handleLogout} />
        </View>

        {/* <ModalAddSkill
        isOpen={showAddSkillModal}
        onClose={closeAddSkillModal}
        onSave={handleSaveNewSkill}
      /> */}

        <MainContainer>
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
                  <InputField
                    type="number"
                    value={novoNivel}
                    onChange={e => setNovoNivel(e.nativeEvent.text)}
                    placeholder="Novo nível"
                  />

                  <SaveButton onClick={() => handleSave(skill.id)}>
                    <Ionicons name="save" size={24} color="white" />
                  </SaveButton>
                </ContainerEdicao>
              ) : (
                <ContainerEdicao onClick={() => handleEdit(skill.id)}>
                  <CardLevel>
                    Nível {skill.level}/10
                    <Octicons
                      name="pencil"
                      size={24}
                      color="white"
                      style={{ marginLeft: 10 }}
                    />
                  </CardLevel>
                </ContainerEdicao>
              )}

              <CardDescription>{skill.skill.descricao}</CardDescription>
            </CardContainer>
          ))}
        </MainContainer>
      </Container>
    </ScrollView>
  );
}
