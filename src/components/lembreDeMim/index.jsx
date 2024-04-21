import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const LembrarCheckbox = ({ lembrarUsuario, onChange }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={onChange}>
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          {lembrarUsuario && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: "#fff",
              }}
            />
          )}
        </View>
      </TouchableOpacity>
      <Text style={{ color: "#f1f1f1" }}>Lembre de mim</Text>
    </View>
  );
};

export default LembrarCheckbox;
