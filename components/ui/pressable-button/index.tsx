import stylesFn from "@/styles/pressable-button/PressableButton.styles";
import { useTheme } from "@react-navigation/native";
import { Pressable, Text } from "react-native";

interface PressableButtonProps extends React.ComponentProps<typeof Pressable> {
  title: string;
}

const PressableButton: React.FC<PressableButtonProps> = ({
  title,
  ...props
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <Pressable style={styles.button} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default PressableButton;

