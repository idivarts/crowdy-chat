import styles from "@/styles/menu/Menu.styles";
import { PropsWithChildren } from "react";
import { Pressable } from "react-native";

interface MenuOptionProps extends PropsWithChildren {
  onSelect: () => void;
}

const MenuOption: React.FC<MenuOptionProps> = ({
  children,
  onSelect,
}) => (
  <Pressable onPress={onSelect} style={styles.menuOption}>
    {children}
  </Pressable>
);

export default MenuOption;
