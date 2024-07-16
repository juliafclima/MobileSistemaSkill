import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { StyleSheet, TextInputProps, View } from "react-native";

import { colors } from "../../../global/styles/theme";
import { Colors } from "../../../types/colors";
import { Container } from "../input/styles";

export const PasswordInput: React.FunctionComponent<TextInputProps> = ({
  ...otherProps
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.inputContainer}>
      <Container
        secureTextEntry={secureTextEntry}
        placeholderTextColor={(colors as Colors).gray[500]}
        {...otherProps}
        style={styles.input}
      />
      <MaterialIcons
        name={secureTextEntry ? "visibility-off" : "visibility"}
        size={24}
        color="white"
        onPress={() => setSecureTextEntry(!secureTextEntry)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: colors.gray[800],
    paddingRight: 20,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    color: colors.light,
    fontSize: 14,
    fontWeight: "400",
  },
});
