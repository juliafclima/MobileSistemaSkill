import { TextInput } from "react-native";
import styled from "styled-components/native";

import { colors, fonts } from "@/global/styles/theme";
import { Colors } from "@/types/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
  width: 100%;
  padding: 18px 16px;
  background-color: ${colors.gray[800]};
  color: ${colors.light};
  border-radius: 5px;
  margin-bottom: 16px;
  font-size: ${RFValue(14)}px;
  font-weight: ${fonts.regular};
`;
