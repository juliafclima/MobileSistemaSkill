import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "./src/global/styles/theme";
import { Rotas } from "./src/routes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Rotas />
    </ThemeProvider>
  );
}
