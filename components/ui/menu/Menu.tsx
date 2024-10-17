import {
  Menu as PaperMenu,
} from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/menu/Menu.styles";

interface MenuProps extends React.ComponentProps<typeof PaperMenu> { }

const Menu: React.FC<MenuProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <PaperMenu
      contentStyle={styles.menuContentStyle}
      style={styles.menuStyle}
      {...props}
    >
      {children}
    </PaperMenu>
  );
};

export default Menu;
