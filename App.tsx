import React from "react";
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";

import theme from "@/global/styles/theme";
import SignUp from "@/pages/SignUp";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SignUp />
      </ThemeProvider>
    </NavigationContainer>
  );
}
