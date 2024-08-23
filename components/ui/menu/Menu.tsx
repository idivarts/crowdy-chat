import {
  Menu as PaperMenu,
} from "react-native-paper";
import styles from "@/styles/menu/Menu.styles";

interface MenuProps extends React.ComponentProps<typeof PaperMenu> { }

const Menu: React.FC<MenuProps> = ({
  children,
  ...props
}) => {
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
