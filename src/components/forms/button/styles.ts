import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { colors, fonts } from "../../../global/styles/theme";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  align-items: center;
  background-color: ${colors.primary};
  border-radius: 5px;
  padding: ${RFValue(18)}px;
  margin-top: ${RFValue(16)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: ${fonts.bold};
  color: ${colors.light};
`;
