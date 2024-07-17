import { StyleSheet } from "react-native";

import { colors } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkboxWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  innerCheckbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.light,
  },

  text: {
    color: colors.light,
  },
});
