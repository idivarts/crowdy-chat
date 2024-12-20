import { PropsWithChildren, useMemo } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import Colors from "@/constants/Colors";
import { useThemeColor } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";

interface AppLayoutProps extends PropsWithChildren<Record<string, unknown>> {}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isAndroid = useMemo(() => Platform.OS === "android", []);
  const lightColor = useMemo(() => Colors(theme).background, []);
  const darkColor = useMemo(() => Colors(theme).background, []);
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: Colors(theme).background,
          paddingTop: isAndroid ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      {children}
      <ExpoStatusBar style={!theme.dark ? "dark" : "light"} />
    </SafeAreaView>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
