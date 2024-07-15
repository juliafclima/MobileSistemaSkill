import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";

import { Button } from "../../components/forms/button";
import { Input } from "../../components/forms/input";
import { PasswordInput } from "../../components/forms/passwordInpu";
import { Container, Content, Title } from "../../pages/SignUp/styles";
import { postCadastro } from "../../services/LoginService";

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
        await postCadastro(usuario);

        Alert.alert("Cadastrado com sucesso");
        setLogin("");
        setSenha("");
        setConfirmSenha("");
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
          <Title>Cadastro</Title>

          <Input
            value={login}
            onChangeText={text => setLogin(text)}
            placeholder="Digite seu login"
          />

          <PasswordInput
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
          />

          <PasswordInput
            value={confirmSenha}
            onChangeText={setConfirmSenha}
            placeholder="Confirme sua senha"
          />
          <Button
            activeOpacity={0.7}
            title={loading ? "Carregando..." : "Inscrever-se"}
            onPress={cadastrar}
          />
        </Content>
      </Container>
    </ScrollView>
  );
}
