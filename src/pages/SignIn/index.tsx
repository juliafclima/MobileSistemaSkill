import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container, Content, Title } from "@/pages/SignIn/styles";
import { Input } from "@/components/forms/input";
import { Button } from "@/components/forms/button";
import CheckBox from "@/components/lembreDeMim";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const [check, setCheck] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  async function handleCheck() {
    setCheck(!check);
    
    if (login && password) {
      if (!check) {
        await AsyncStorage.removeItem("login");
        await AsyncStorage.removeItem("password");
      }
    } else {
      Alert.alert("Prencha todos os campos!");
    }
  }

  async function handleLogin() {
    if (check) {
      await AsyncStorage.setItem("login", login);
      await AsyncStorage.setItem("password", password);
    }

    navigation.navigate("Home");
  }

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
            onChangeText={setLogin}
            value={login}
            placeholder="Digite seu login"
          />
          <Input
            onChangeText={setPassword}
            value={password}
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
            <CheckBox
              label="Lembre de mim"
              labelStyle={{ color: "#fff", fontSize: 16 }}
              iconColor="#fff"
              checkColor="#000"
              value={check}
              onChange={handleCheck}
            />
          </View>

          <Button activeOpacity={0.7} title="Entrar" onPress={handleLogin} />
        </Content>
      </Container>
    </ScrollView>
  );
}
