import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";

import { Button } from "../../../components/forms/button";
import { Input } from "../../../components/forms/input";
import { postCadastro } from "../../../server/LoginService";

import { PasswordInput } from "../../../components/forms/passwordInpu";
import { Container, Content, Title } from "../styles";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    login: "",
    senha: "",
    confirmSenha: "",
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validarFormulario = () => {
    const { login, senha, confirmSenha } = formData;
    if (!login || !senha || !confirmSenha) {
      Alert.alert("Preencha todos os campos");
      return false;
    }
    if (senha !== confirmSenha) {
      Alert.alert("Senhas divergem");
      return false;
    }
    return true;
  };

  const cadastrar = async () => {
    if (!validarFormulario()) {
      return;
    }

    const { login, senha } = formData;
    const usuario = { login, senha };

    try {
      setLoading(true);
      await postCadastro(usuario);
      Alert.alert("Cadastrado com sucesso");
      setFormData({ login: "", senha: "", confirmSenha: "" });
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro ao cadastrar, tente novamente mais tarde.");
    } finally {
      setLoading(false);
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
            value={formData.login}
            onChangeText={(text) => handleChange("login", text)}
            placeholder="Digite seu login"
          />

          <PasswordInput
            value={formData.senha}
            onChangeText={(text) => handleChange("senha", text)}
            placeholder="Digite sua senha"
          />

          <PasswordInput
            value={formData.confirmSenha}
            onChangeText={(text) => handleChange("confirmSenha", text)}
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
};

export default SignUp;
