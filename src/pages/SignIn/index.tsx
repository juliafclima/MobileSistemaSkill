import React, { useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container, Content, Title } from "@/pages/SignIn/styles";
import { Input } from "@/components/forms/input";
import { Button } from "@/components/forms/button";
import { postLogin } from "@/services/LoginService";
import LembrarCheckbox from "@/components/lembreDeMim";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lembrarUsuario, setLembrarUsuario] = useState(false);

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

        const token = response.data.token;
        AsyncStorage.setItem("token", token);

        const userId = response.data.userId;

        if (userId) {
          AsyncStorage.setItem("userId", userId);
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
        navigation.navigate("Home");
      } catch (error) {
        console.error("Erro ao realizar login:", error);
        Alert.alert("Senha e/ou login errados!");
      }
    } else {
      Alert.alert("Preencha todos os campos");
    }
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
          <Input
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
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
              onChange={() => setLembrarUsuario(!lembrarUsuario)}
            />
          </View>

          <Button activeOpacity={0.7} title="Entrar" onPress={logar} />
          <TouchableOpacity onPress={() => {}}>
            <Text>Não tem conta?</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    </ScrollView>
  );
}
