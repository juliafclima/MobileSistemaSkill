import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./style";

interface Props {
  lembrarUsuario: boolean;
  onChange: () => void;
}

const LembrarCheckbox: React.FC<Props> = ({ lembrarUsuario, onChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onChange}>
        <View style={styles.checkboxWrapper}>
          {lembrarUsuario && <View style={styles.innerCheckbox} />}
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>Lembre de mim</Text>
    </View>
  );
};

export default LembrarCheckbox;
