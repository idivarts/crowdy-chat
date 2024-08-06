import { View } from "@/components/Themed";
import styles from "@/styles/header/Header.styles";
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
      style={[
        styles.headerSection,
        {
          gap,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default HeaderSection;
