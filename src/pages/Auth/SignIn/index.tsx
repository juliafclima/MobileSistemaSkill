import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { Button } from "../../../components/forms/button";
import { Input } from "../../../components/forms/input";
import { PasswordInput } from "../../../components/forms/passwordInpu";
import LembrarCheckbox from "../../../components/lembreDeMim";
import { postLogin } from "../../../server/LoginService";
import { Container, Content, Title } from "../styles";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    lembrarUsuario: false,
  });

  const navigation = useNavigation();

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedPassword = await AsyncStorage.getItem("password");

        if (storedUsername && storedPassword) {
          setFormData({
            ...formData,
            username: storedUsername,
            password: storedPassword,
            lembrarUsuario: true,
          });
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    retrieveData();
  }, []);

  const logar = async () => {
    const { username, password, lembrarUsuario } = formData;

    if (username && password) {
      try {
        const response = await postLogin(username, password);

        const userId = response.data.userId;
        await AsyncStorage.setItem("userId", userId.toString());

        if (lembrarUsuario) {
          await AsyncStorage.setItem("username", username);
          await AsyncStorage.setItem("password", password);
        } else {
          await AsyncStorage.removeItem("username");
          await AsyncStorage.removeItem("password");
        }

        navigation.navigate("Home", { username, password, novoEstado: true });
      } catch (error) {
        Alert.alert("Senha e/ou login incorretos!");
      }
    } else {
      Alert.alert("Preencha todos os campos");
    }
  };

  const handleCheckboxChange = () => {
    const novoEstado = !formData.lembrarUsuario;
    setFormData({ ...formData, lembrarUsuario: novoEstado });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Content>
          <Title>Sistema Skill</Title>
          <Title>Login</Title>

          <Input
            value={formData.username}
            onChangeText={(text) =>
              setFormData({ ...formData, username: text })
            }
            placeholder="Digite seu login"
          />

          <PasswordInput
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            placeholder="Digite sua senha"
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <LembrarCheckbox
              lembrarUsuario={formData.lembrarUsuario}
              onChange={handleCheckboxChange}
            />
          </View>

          <Button activeOpacity={0.7} title="Entrar" onPress={logar} />
        </Content>
      </Container>
    </ScrollView>
  );
};

export default SignIn;
