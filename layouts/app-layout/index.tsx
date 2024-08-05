import { PropsWithChildren, useMemo } from "react";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useThemeColor } from "@/components/Themed";

interface AppLayoutProps extends PropsWithChildren<{}> {}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
}) => {
  const isAndroid = useMemo(() => Platform.OS === "android", []);
  const lightColor = useMemo(() => Colors.light.background, []);
  const darkColor = useMemo(() => Colors.dark.background, []);
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        paddingTop: isAndroid ? StatusBar.currentHeight : 0,
      }}
    >
      {children}
      <ExpoStatusBar style={colorScheme === 'light' ? "dark" : 'light'} />
    </SafeAreaView>
  );
};

export default AppLayout;
