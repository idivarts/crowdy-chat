import {
  Button as PaperButton,
} from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/button/Button.styles";

interface ButtonProps extends React.ComponentProps<typeof PaperButton> { }

const Button: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <PaperButton
      style={styles.button}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

export default Button;
