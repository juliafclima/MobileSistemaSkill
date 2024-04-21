import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";
import axios from "axios";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  UserAvatarButton,
  UserAvatar,
  UserInfoDetail,
  UserGreeting,
  UserName,
} from "@/pages/Home/styles";
import avatarDefault from "@/assets/avatar02.png";
import { Input } from "@/components/forms/input/index";

type Skill = {
  id: number;
  level: string;
  usuario: {
    id: number;
    login: string;
    senha: string;
    situacao: string;
  };
  skill: {
    id: number;
    nome: string;
    descricao: string;
    url: string;
  };
};

export default function Home() {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [tokenExists, setTokenExists] = useState(false);
  const [novoNivel, setNovoNivel] = useState("0/10");
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);

  const navigate = useNavigation();

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatarButton activeOpacity={0.7} onpress={() => {}}>
              <UserAvatar source={avatarDefault} />
            </UserAvatarButton>

            <UserInfoDetail>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Júlia</UserName>
            </UserInfoDetail>
          </UserInfo>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>✖</Text>
          </TouchableOpacity>
        </UserWrapper>
        <></>
      </Header>

      <Input placeholder="oi" />
    </Container>
  );
}
