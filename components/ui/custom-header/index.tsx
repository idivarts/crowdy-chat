import { useNavigation } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";
import { Appbar } from "react-native-paper";
import { useBreakPoints } from "@/hooks";
import { DrawerToggle } from "@/components/ui";

const CustomHeader = ({ ...props }) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const { lg } = useBreakPoints();

  return (
    <Appbar.Header statusBarHeight={0}>
      {!lg && <DrawerToggle />}
      <Appbar.Content title={props.title} />
    </Appbar.Header>
  );
};

export default CustomHeader;
