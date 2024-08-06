import { View } from "@/components/Themed";
import useBreakpoints from "@/hooks/use-breakpoints";
import styles from "@/styles/header/Header.styles";
import { PropsWithChildren } from "react";

interface HeaderContainerProps extends PropsWithChildren {
  gap?: number;
};

const HeaderContainer: React.FC<HeaderContainerProps> = ({
  children,
  gap = 10,
}) => {
  const { lg } = useBreakpoints();

  return (
    <View
      style={[
        styles.headerContainer,
        {
          gap,
          paddingHorizontal: lg ? 20 : 10,
          paddingVertical: lg ? 20 : 10,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default HeaderContainer;
