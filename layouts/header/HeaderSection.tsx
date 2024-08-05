import { View } from "@/components/Themed";
import { PropsWithChildren } from "react";

const HeaderSection: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 6,
      }}
    >
      {children}
    </View>
  );
};

export default HeaderSection;
