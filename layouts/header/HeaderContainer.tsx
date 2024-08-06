import { View } from "@/components/Themed";
import useBreakpoints from "@/hooks/use-breakpoints";
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
      style={{
        alignItems: 'center',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        flexDirection: 'row',
        gap,
        justifyContent: 'space-between',
        paddingHorizontal: lg ? 20 : 10,
        paddingVertical: lg ? 20 : 10,
        zIndex: 1000,
      }}
    >
      {children}
    </View>
  );
};

export default HeaderContainer;
