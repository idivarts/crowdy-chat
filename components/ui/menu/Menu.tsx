import { View } from "react-native";
import React, { PropsWithChildren, useState, ReactElement, ReactNode } from "react";
import MenuTrigger from "./MenuTrigger";
import MenuOptions from "./MenuOptions";
import styles from "@/styles/menu/Menu.styles";

interface MenuProps extends PropsWithChildren<{}> {}

const Menu: React.FC<MenuProps> = ({ children }: MenuProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const isReactElement = (node: ReactNode): node is ReactElement => {
    return typeof node === 'object' && node !== null && 'props' in node;
  };

  const modifiedChildren = React.Children.map(children, (child) => {
    if (isReactElement(child)) {
      if (child.type === MenuTrigger) {
        return React.cloneElement(child, {
          onPress: toggleDropdown,
        });
      }
      if (child.type === MenuOptions) {
        return React.cloneElement(child, {
          visible: showDropdown,
        });
      }
    }
    return child;
  });

  return <View style={styles.menuContainer}>{modifiedChildren}</View>;
};

export default Menu;
