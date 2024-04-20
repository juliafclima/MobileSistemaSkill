// Importe o hook useContext
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { AuthContext } from "../context/AuthProvider";
import { Stack } from "./stack";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

const { Navigator, Screen } = createBottomTabNavigator();

export const Rotas = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Navigator
        tabBarOptions={{
          activeTintColor: "#3498db",
          inactiveTintColor: "#bdc3c7",
        }}
      >
        {user ? (
          <>
            <Screen
              name="Stack"
              component={Stack}
              options={{
                tabBarLabel: "Inicio",
                header: () => null,
                tabBarIcon: ({ color, size }) => (
                  <Feather name="home" size={size} color={color} />
                ),
              }}
            />
          </>
        ) : (
          <>
            <Screen
              name="Login"
              component={SignIn}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Feather name="log-in" size={size} color={color} />
                ),
              }}
            />
            <Screen
              name="Cadastro"
              component={SignUp}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Feather name="user-plus" size={size} color={color} />
                ),
              }}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};
