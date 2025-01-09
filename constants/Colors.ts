import { Theme } from "@react-navigation/native";

const tintColorLight = "#1976d2";
const tintColorDark = "#fff";

export default (theme: Theme) => ({
  ...theme.colors,
  ...(theme.dark
    ? {
        text: "#fff",
        background: "#000",
        tint: tintColorDark,
        tabIconDefault: "#ccc",
        tabIconSelected: tintColorDark,
      }
    : {
        text: "#000",
        background: "#fff",
        tint: tintColorLight,
        tabIconDefault: "#ccc",
        tabIconSelected: tintColorLight,
      }),
  aliceBlue: "#E9F1F7",
  backdrop: "rgba(0, 0, 0, 0.5)",
  black: "#000",
  lightgray: "lightgray",
  onSurface: "#1976d2",
  orange: "#F64740",
  platinum: "#DBDBDB",
  primary: "#1976d2",
  transparent: "transparent",
  red: "red",
  gray100: "#555",
  gray200: "#f9f9f9",
  gray300: "#757575",
  surface: "#ffffff",
  surfaceVariant: "#ffffff",
  white: "#ffffff",
});
