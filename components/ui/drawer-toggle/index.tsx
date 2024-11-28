import { Pressable } from "react-native";
import { DrawerActions, useTheme } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";

interface DrawerToggleProps extends React.ComponentProps<typeof Pressable> {}

const DrawerToggle: React.FC<DrawerToggleProps> = ({ ...props }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Pressable
      {...props}
      key={0}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
      <View
        style={{
          borderRadius: 4,
          cursor: "pointer",
          paddingLeft: 14,
          paddingRight: 8,
          paddingVertical: 6,
        }}
      >
        <Ionicons
          name="menu"
          size={28}
          style={[
            {
              color: Colors(theme).tint,
              marginBottom: -2,
            },
          ]}
        />
      </View>
    </Pressable>
  );
};

export default DrawerToggle;
