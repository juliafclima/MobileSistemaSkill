import React from "react";
import { TextInputProps } from "react-native";

import { colors } from "../../../global/styles/theme";
import { Colors } from "../../../types/colors";
import { Container } from "./styles";

interface InputProps extends TextInputProps {}

export const Input: React.FC<InputProps> = ({ ...otherProps }) => {
  return (
    <Container
      placeholderTextColor={(colors as Colors).gray[500]}
      {...otherProps}
    ></Container>
  );
};
