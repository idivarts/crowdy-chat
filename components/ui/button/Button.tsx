import {
  Button as PaperButton,
} from "react-native-paper";

interface ButtonProps extends React.ComponentProps<typeof PaperButton> { }

const Button: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <PaperButton
      style={{
        borderRadius: 4,
      }}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

export default Button;
