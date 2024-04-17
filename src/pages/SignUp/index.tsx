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
          <Title>Crie sua conta</Title>

          <Input placeholder="Nome completo" />
          <Input placeholder="Email" />
          <Input placeholder="Senha" />

          <Button activeOpacity={0.7} title="Criar conta" />
        </Content>
      </Container>
    </ScrollView>
  );
}
