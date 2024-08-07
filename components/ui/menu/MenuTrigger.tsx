import styles from "@/styles/menu/Menu.styles";
import { PropsWithChildren } from "react";
import { Pressable } from "react-native";

interface MenuTriggerProps extends PropsWithChildren {
  onPress?: () => void;
}

const MenuTrigger: React.FC<MenuTriggerProps> = ({
  children,
  onPress,
}) => (
  <Pressable onPress={onPress} style={styles.menuTrigger}>
    {children}
  </Pressable>
);

export default MenuTrigger;
