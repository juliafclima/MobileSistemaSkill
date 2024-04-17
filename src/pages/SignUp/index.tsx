import React from "react";
import { ScrollView } from "react-native";

import { Container, Content, Title } from "@/pages/SignUp/styles";
import { Input } from "@/components/forms/input";
import { Button } from "@/components/forms/button";

export default function SignUp() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Content>
          <Title>Sistema Skill</Title>
          <Title>Cadastro</Title>

          <Input placeholder="Digite seu login" />
          <Input placeholder="Digite sua senha" />
          <Input placeholder="Digite sua senha" />

          <Button activeOpacity={0.7} title="Inscrever-se" />
        </Content>
      </Container>
    </ScrollView>
  );
}
