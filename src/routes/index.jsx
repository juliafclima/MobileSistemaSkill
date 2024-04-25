import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";

const { Navigator, Screen } = createBottomTabNavigator();

export const Rotas = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#bdc3c7",
          tabBarStyle: {
            display: "flex",
          },
        }}
      >
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
        <Screen
          name="Home"
          component={Home}
          options={{
            tabBarStyle: { display: "none" },
            tabBarVisible: false,
            tabBarButton: () => null,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
