import { View } from "@/components/Themed";
import styles from "@/styles/menu/Menu.styles";
import { PropsWithChildren } from "react";

interface MenuOptionsProps extends PropsWithChildren {
  gap?: number;
  visible?: boolean;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({
  children,
  gap = 6,
  visible,
}) => {
  if (!visible) return null;

  return (
    <View
      style={[
        styles.menuOptions,
        {
          gap,
        }
      ]}
    >
      {children}
    </View>
  )
};

export default MenuOptions;
