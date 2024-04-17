import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { colors, fonts } from "@/global/styles/theme";
import { Colors } from "@/types/colors";

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.dark};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(17)}px;
  background-color: ${colors.secondary};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: ${RFValue(28)}px;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px 24px 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: ${RFValue(52)};
  height: ${RFValue(52)};
  border-radius: 10px;
`;

export const UserInfoDetail = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${(colors as Colors).gray[800]};
  font-size: ${RFValue(18)}px;
  font-weight: ${fonts.regular};
`;

export const UserName = styled.Text`
  color: ${(colors as Colors).gray[800]};
  font-size: ${RFValue(18)}px;
  font-weight: ${fonts.bold};
`;

export const Icon = styled.Text`
  color: ${colors.dark};
  font-size: ${RFValue(28)}px;
`;
