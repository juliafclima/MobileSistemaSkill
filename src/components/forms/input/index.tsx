import React, { FunctionComponent } from "react";
import { TextInputProps } from "react-native";

import { colors } from "../../../global/styles/theme";
import { Colors } from "../../../types/colors";
import { Container } from "./styles";

export const Input: FunctionComponent<TextInputProps> = ({ ...otherProps }) => {
  return (
    <Container
      placeholderTextColor={(colors as Colors).gray[500]}
      {...otherProps}
    ></Container>
  );
};
