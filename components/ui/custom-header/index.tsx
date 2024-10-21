import { useNavigation } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";
import { Appbar } from "react-native-paper";
import { useBreakPoints } from "@/hooks";
import { DrawerToggle } from "@/components/ui";
import Colors from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

const CustomHeader = ({ ...props }) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { lg } = useBreakPoints();

  return (
    <Appbar.Header
      statusBarHeight={0}
      style={{
        backgroundColor: Colors(theme).background,
      }}
    >
      {!lg && <DrawerToggle />}
      <Appbar.Content title={props.title} />
    </Appbar.Header>
  );
};

export default CustomHeader;
