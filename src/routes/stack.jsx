import Home from "@/pages/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
