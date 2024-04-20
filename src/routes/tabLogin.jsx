import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

const { Navigator, Screen } = createBottomTabNavigator();

export const TabLogin = () => {
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: "#3498db",
        inactiveTintColor: "#bdc3c7",
      }}
    >
      <Screen
        name="Login"
        component={SignIn}
        options={{
          headerShown: false,
          header: () => null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Cadastro"
        component={SignUp}
        options={{
          headerShown: false,
          header: () => null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
