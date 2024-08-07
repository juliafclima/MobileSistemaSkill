import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

import { colors } from "../../global/styles/theme";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      onSearch(searchTerm);
      setSearchTerm("");
    } catch (error) {
      console.error("Erro ao buscar habilidades do usuário:", error);
    }
  };

  return (
    <View style={styles.searchInputContainer}>
      <TextInput
        style={styles.searchInputStyle}
        placeholder="Pesquisar pelo nome da skill...
        "
        placeholderTextColor={colors.light}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Buscar" onPress={handleSearch} color={colors.gray[500]} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    flex: 1
  },

  searchInputStyle: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.gray[500],
    borderRadius: 4,
    color: colors.light,
    fontWeight: "900",
  },
});

export default SearchInput;
