import { View } from "@/components/Themed";
import { PropsWithChildren } from "react";

const HeaderContainer: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'space-between',
      }}
    >
      {children}
    </View>
  );
};

export default HeaderContainer;
