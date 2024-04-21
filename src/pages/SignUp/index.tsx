import React, { useState } from "react";
import { Alert, ScrollView, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Title } from "@/pages/SignUp/styles";
import { Input } from "@/components/forms/input";
import { Button } from "@/components/forms/button";
import { postCadastro } from "@/services/LoginService";

export default function SignUp() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const cadastrar = async () => {
    if (senha && confirmSenha && login) {
      if (senha !== confirmSenha) {
        Alert.alert("Senhas divergem");
        return;
      }

      const usuario = {
        login: login,
        senha: senha,
      };

      try {
        setLoading(true);
        const response = await postCadastro(usuario);

        Alert.alert("Cadastrado com sucesso");

        setLoading(false);
        navigation.navigate("Login");
      } catch (error) {
        console.error("Erro ao cadastrar:", error);

        setLoading(false);
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
          <Title>Cadastro</Title>
          <Input
            value={login}
            onChangeText={text => setLogin(text)}
            placeholder="Digite seu login"
          />
          <Input
            value={senha}
            onChangeText={text => setSenha(text)}
            secureTextEntry
            placeholder="Digite sua senha"
          />
          <Input
            value={confirmSenha}
            onChangeText={text => setConfirmSenha(text)}
            secureTextEntry
            placeholder="Confirme sua senha"
          />
          <Button
            activeOpacity={0.7}
            title={loading ? "Carregando..." : "Inscrever-se"}
            onPress={cadastrar}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>Já tem conta?</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    </ScrollView>
  );
}
