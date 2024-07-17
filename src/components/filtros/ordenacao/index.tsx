import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors } from "../../../global/styles/theme";

interface SortButtonProps {
  ascending: boolean;
  onClick: () => void;
}

const Ordenacao: React.FC<SortButtonProps> = ({ ascending, onClick }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Text style={styles.buttonText}>Ordenar nome</Text>

      <FontAwesome6
        name={ascending ? "arrow-up-wide-short" : "arrow-down-wide-short"}
        size={24}
        color="white"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: colors.gray[500],
    backgroundColor: colors.dark,
    width: "100%",
    maxWidth: 400, 
    alignSelf: "center",
    marginTop: 20
  },

  buttonText: {
    fontSize: 16,
    color: colors.light,
    fontWeight: '900',
  },
});

export default Ordenacao;
