import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "@/global/styles/theme";
import { Rotas } from "@/routes";
import { AuthProvider } from "@/context/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Rotas />
      </ThemeProvider>
    </AuthProvider>
  );
}
