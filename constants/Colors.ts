import { Theme } from "@react-navigation/native";

const tintColorLight = "#F4801F";
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
  onSurface: "#F4801F",
  orange: "#F64740",
  platinum: "#DBDBDB",
  primary: "#F4801F",
  outline: "#F4801F",
  transparent: "transparent",
  secondary: "#F8B702",
  secondaryContainer: "#F4801F",
  red: "red",
  gray100: "#555",
  gray200: "#f9f9f9",
  gray300: "#757575",
  surface: "#ffffff",
  surfaceVariant: "#ffffff",
  white: "#ffffff",
});
