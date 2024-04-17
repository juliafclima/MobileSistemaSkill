import React from "react";

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
  Icon,
} from "@/pages/Home/styles";
import avatarDefault from "@/assets/avatar02.png";
import { Input } from "@/components/forms/input/index";

export default function Home() {
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

          <Icon>✖</Icon>
        </UserWrapper>
        <></>
      </Header>

      <Input placeholder="oi" />
    </Container>
  );
}
