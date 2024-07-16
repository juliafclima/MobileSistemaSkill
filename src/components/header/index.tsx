import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import logo from "../../assets/logo.png";
import { colors } from "../../global/styles/theme";

interface HeaderProps {
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogout }) => {
  const [usuarioLogado, setUsuarioLogado] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      const username = await AsyncStorage.getItem("username");
      if (username) {
        setUsuarioLogado(username);
      }
    };
    fetchUsername();
  }, []);

  return (
    <HeaderContainer>
      <Logo source={logo} />
      {usuarioLogado && <WelcomeText>Olá, {usuarioLogado}! :)</WelcomeText>}

      <LogoutButton onPress={handleLogout}>
        <LogoutText>Sair</LogoutText>
      </LogoutButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const Logo = styled.Image`
  width: 50px;
  height: 50px;
`;

const WelcomeText = styled.Text`
  text-align: right;
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const LogoutButton = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 5px;
  border-width: 2.5px;
  border-color: ${colors.light};
  background-color: ${colors.primary};
`;

const LogoutText = styled.Text`
  color: ${colors.dark};
  font-weight: bold;
  font-size: 16px;
`;

export default Header;
