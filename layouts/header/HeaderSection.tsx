import { View } from "@/components/Themed";
import stylesFn from "@/styles/header/Header.styles";
import { useTheme } from "@react-navigation/native";
import { PropsWithChildren } from "react";

interface HeaderSectionProps extends PropsWithChildren {
  gap?: number;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  children,
  gap = 10,
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);

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
