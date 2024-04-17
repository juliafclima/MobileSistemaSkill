import React, { FunctionComponent } from "react";
import { TextInputProps } from "react-native";

import { Container } from "@/components/forms/input/styles";
import { colors } from "@/global/styles/theme";
import { Colors } from "@/types/colors";

export const Input: FunctionComponent<TextInputProps> = ({ ...otherProps }) => {
  return (
    <Container
      placeholderTextColor={(colors as Colors).gray[500]}
      {...otherProps}
    ></Container>
  );
};
