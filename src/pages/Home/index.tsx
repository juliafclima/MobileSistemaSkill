import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";

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

export default function Home() {
  const navigation = useNavigation();

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

