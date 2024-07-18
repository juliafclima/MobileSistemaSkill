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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lembrarUsuario, setLembrarUsuario] = useState(false);

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

  const navigation = useNavigation();

  const logar = async () => {
    if (username && password) {
      try {
        const response = await postLogin(username, password);

        await AsyncStorage.setItem("username", username.toString());

        const userId = response.data.userId;

        if (userId) {
          await AsyncStorage.setItem("userId", userId.toString());
        }

        if (lembrarUsuario) {
          await AsyncStorage.setItem("password", password.toString());
        } else {
          setUsername("");
          setPassword("");

          await AsyncStorage.removeItem("username");
          await AsyncStorage.removeItem("password");
        }

        navigation.navigate("Home");
      } catch (error) {
        console.error("Erro ao realizar login: ", error);
        Alert.alert("Senha e/ou login incorretos!");
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
          <Title>Login</Title>

          <Input
            placeholder="Digite seu login"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <PasswordInput
            placeholder="Digite sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
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
        </Content>
      </Container>
    </ScrollView>
  );
};

export default SignIn;
