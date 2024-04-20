import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/pages/Home";

const { Navigator, Screen } = createNativeStackNavigator();

export const Stack = () => {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={Home}
        options={{ title: "Página Principal", headerShown: false }}
      />
    </Navigator>
  );
};
