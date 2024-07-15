import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { Button } from "../../components/forms/button";
import { Input } from "../../components/forms/input";
import { PasswordInput } from "../../components/forms/passwordInpu";
import LembrarCheckbox from "../../components/lembreDeMim";
import { postLogin } from "../../services/LoginService";
import { Container, Content, Title } from "./styles";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lembrarUsuario, setLembrarUsuario] = useState(false);
  const [novoEstado, setNovoEstado] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedPassword = await AsyncStorage.getItem("password");

        if (storedUsername && storedPassword) {
          setUsername(storedUsername);
          setPassword(storedPassword);
          setLembrarUsuario(true);
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    retrieveData();
  }, []);

  const logar = async () => {
    if (password && username) {
      try {
        const response = await postLogin(username, password);

        const userId = response.data.userId;

        if (userId) {
          await AsyncStorage.setItem("userId", userId.toString());
        }

        if (lembrarUsuario) {
          try {
            await AsyncStorage.setItem("username", username);
            await AsyncStorage.setItem("password", password);
          } catch (error) {
            console.error("Error saving data:", error);
          }
        } else {
          try {
            await AsyncStorage.removeItem("username");
            await AsyncStorage.removeItem("password");
          } catch (error) {
            console.error("Error removing data:", error);
          }
        }
        
        navigation.navigate("Home", { setUsername, setPassword, novoEstado });
      } catch (error) {
        Alert.alert("Senha e/ou login errados!");
      }
    } else {
      Alert.alert("Preencha todos os campos");
    }
  };

  const handleCheckboxChange = () => {
    const novoEstado = !lembrarUsuario;
    setLembrarUsuario(novoEstado);
    setNovoEstado(novoEstado);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Content>
          <Title>Sistema Skill</Title>
          <Title>login</Title>

          <Input
            value={username}
            onChangeText={text => setUsername(text)}
            placeholder="Digite seu login"
          />

          <PasswordInput
            value={password}
            onChangeText={setPassword}
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
              lembrarUsuario={lembrarUsuario}
              onChange={handleCheckboxChange}
            />
          </View>

          <Button activeOpacity={0.7} title="Entrar" onPress={logar} />
        </Content>
      </Container>
    </ScrollView>
  );
}
