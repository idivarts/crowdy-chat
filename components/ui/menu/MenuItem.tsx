import styles from "@/styles/menu/Menu.styles";
import {
  Menu as PaperMenu,
} from "react-native-paper";

interface MenuItemProps extends React.ComponentProps<typeof PaperMenu.Item> { }

const MenuItem: React.FC<MenuItemProps> = ({
  ...props
}) => {
  return (
    <PaperMenu.Item
      style={styles.menuItem}
      titleStyle={styles.menuItemText}
      {...props}
    />
  );
};

export default MenuItem;
