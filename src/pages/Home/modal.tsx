import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, View, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ModalAddSkillProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

type Skill = {
  id: number;
  nome: string;
  descricao: string;
  url: string;
};

const ModalAddSkill = ({ isOpen, onClose, onSave }: ModalAddSkillProps) => {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const fetchUserSkills = async () => {
    const response = await axios.get(`http://192.168.1.159:8080/skill`);
    setUserSkills(response.data);
  };

  useEffect(() => {
    fetchUserSkills();
  }, []);

  const handleSubmit = async () => {
    if (selectedSkillId !== null) {
      if (selectedSkills.includes(selectedSkillId)) {
        Alert.alert("Você já adicionou esta skill.");
        return;
      }

      const userID = Number(await AsyncStorage.getItem("userId"));

      try {
        await axios.post(`http://192.168.1.159:8080/usuario-skill`, {
          level: "",
          usuario: { id: userID },
          skill: { id: selectedSkillId },
        });

        onSave();

        setSelectedSkills([...selectedSkills, selectedSkillId]);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    onClose();
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Picker
            selectedValue={selectedSkillId}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSkillId(itemValue)
            }
          >
            {userSkills.map(skill => (
              <Picker.Item key={skill.id} label={skill.nome} value={skill.id} />
            ))}
          </Picker>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              gap: 30,
            }}
          >
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Salvar" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddSkill;
