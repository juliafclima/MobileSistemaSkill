import Feather from "@expo/vector-icons/Feather";
import React from "react";
import styled from "styled-components/native";

import logo from "../../assets/logo.png";
import { colors } from "../../global/styles/theme";

interface HeaderProps {
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogout }) => {
  return (
    <HeaderContainer>
      <Logo source={logo} />

      <WelcomeText>Olá, usuário! :)</WelcomeText>

      <LogoutButton onPress={handleLogout}>
        <Feather name="log-out" size={24} color="black" />
      </LogoutButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${colors.light};
`;

const Logo = styled.Image`
  width: 50px;
  height: 50px;
`;

const WelcomeText = styled.Text`
  text-align: right;
  margin: 0;
  font-size: 18px;
  color: ${colors.gray[500]};
`;

const LogoutButton = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 5px;
  border-width: 2.5px;
  border-color: ${colors.light};
  background-color: ${colors.primary};
`;

export default Header;
