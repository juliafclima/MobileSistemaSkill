import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "@/global/styles/theme";
import { Rotas } from "@/routes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Rotas />
    </ThemeProvider>
  );
}
