import React from "react";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CheckBox(props) {
  const { label, labelStyle, iconColor, onChange, value, checkColor } = props;

  return (
    <View style={styles.WrapperCheckBox}>
      <TouchableOpacity
        style={[
          styles.CheckBox,
          { backgroundColor: value ? checkColor : "#fff" },
        ]}
        onPress={onChange}
      >
        {value && <Icon name="check" color={iconColor} />}
      </TouchableOpacity>
      <Text style={[styles.LabelCheck, labelStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  CheckBox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
  },

  WrapperCheckBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  LabelCheck: {
    color: "#000",
    marginLeft: 6,
  },
});

CheckBox.propTypes = {
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  iconColor: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  checkColor: PropTypes.string,
};
