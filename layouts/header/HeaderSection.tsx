import { View } from "@/components/Themed";
import { PropsWithChildren } from "react";

interface HeaderSectionProps extends PropsWithChildren {
  gap?: number;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  children,
  gap = 10,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap,
      }}
    >
      {children}
    </View>
  );
};

export default HeaderSection;
