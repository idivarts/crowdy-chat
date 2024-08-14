import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";

const CustomPaperTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: "#1976d2",
    background: "#ffffff",
    text: "#000000",
    surface: "#ffffff",
    onSurface: "#1976d2",
  },
};

export default CustomPaperTheme;
