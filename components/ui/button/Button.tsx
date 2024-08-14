import {
  Button as PaperButton,
} from "react-native-paper";
import styles from "@/styles/button/Button.styles";

interface ButtonProps extends React.ComponentProps<typeof PaperButton> { }

const Button: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
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
