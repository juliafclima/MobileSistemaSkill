import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { colors, fonts } from "@/global/styles/theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.dark};
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: ${fonts.regular};
  color: ${colors.light};
  margin-bottom: 24px;
  text-transform: uppercase;
`;
