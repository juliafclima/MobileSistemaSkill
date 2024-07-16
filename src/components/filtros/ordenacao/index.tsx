import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
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

      {ascending ? (
        <FontAwesome6 name="arrow-up-wide-short" size={24} color="white" />
      ) : (
        <FontAwesome6 name="arrow-down-wide-short" size={24} color="white" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.gray[500],
    borderRadius: 5,
    width: 125,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonText: {
    fontSize: 14,
    color: colors.light,
  },
});

export default Ordenacao;
