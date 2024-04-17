import React from "react";
import { ScrollView } from "react-native";

import { Container, Content, Title } from "@/pages/SignIn/styles";
import { Input } from "@/components/forms/input";
import { Button } from "@/components/forms/button";

export default function SignIn() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Content>
          <Title>Faça seu login</Title>

          <Input placeholder="Email" />
          <Input placeholder="Senha" />

          <Button activeOpacity={0.7} title="Entrar" />
        </Content>
      </Container>
    </ScrollView>
  );
}
