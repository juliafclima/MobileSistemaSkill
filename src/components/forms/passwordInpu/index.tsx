import React, { useState } from "react";
import { TextInputProps, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Container } from "@/components/forms/input/styles";
import { colors } from "@/global/styles/theme";
import { Colors } from "@/types/colors";

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
      <Icon
        name={secureTextEntry ? "visibility-off" : "visibility"}
        size={24}
        color="white"
        onPress={() => setSecureTextEntry(!secureTextEntry)}
        style={styles.icon}
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
    marginBottom: 20
  },

  input: {
    flex: 1,
    color: colors.light,
    fontSize: 14,
    fontWeight: "400",
  },
});
