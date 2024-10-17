import stylesFn from "@/styles/menu/Menu.styles";
import { useTheme } from "@react-navigation/native";
import {
  Menu as PaperMenu,
} from "react-native-paper";

interface MenuItemProps extends React.ComponentProps<typeof PaperMenu.Item> { }

const MenuItem: React.FC<MenuItemProps> = ({
  ...props
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <PaperMenu.Item
      style={styles.menuItem}
      titleStyle={styles.menuItemText}
      {...props}
    />
  );
};

export default MenuItem;
