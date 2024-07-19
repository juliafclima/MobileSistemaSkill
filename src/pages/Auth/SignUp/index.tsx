import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";

import { Button } from "../../../components/forms/button";
import { Input } from "../../../components/forms/input";
import { postCadastro } from "../../../server/LoginService";

import { PasswordInput } from "../../../components/forms/passwordInpu";
import { Container, Content, Title } from "../styles";

const SignUp: React.FC = () => {
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

        setTimeout(() => {
          navigation.navigate("Login");
          setLoading(false);
        }, 1500);
      } catch (error) {
        Alert.alert("Usuario já cadastrado!");
      } finally {
        setLogin("");
        setSenha("");
        setConfirmSenha("");
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
          <Title>CADASTRO</Title>

          <Input
            placeholder="Digite seu login"
            value={login}
            onChangeText={(text) => setLogin(text)}
          />

          <PasswordInput
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />

          <PasswordInput
            placeholder="Confirme sua senha"
            value={confirmSenha}
            onChangeText={(text) => setConfirmSenha(text)}
          />

          <Button
            onPress={cadastrar}
            title={loading ? "Carregando..." : "Inscrever-se"}
            activeOpacity={0.7}
          />
        </Content>
      </Container>
    </ScrollView>
  );
};

export default SignUp;
