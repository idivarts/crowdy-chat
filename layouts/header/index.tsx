import { PropsWithChildren } from "react";
import { Button } from "react-native";

import { View } from "@/components/Themed";
import Logo from "@/components/ui/logo";

const Header: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Logo />
        </View>
        <View>
          <Button title="Signup"/>
          <Button title="Login"/>
        </View>
      </View>
      {children}
    </View>
  );
};

export default Header;
