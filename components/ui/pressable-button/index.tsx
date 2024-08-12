import styles from "@/styles/pressable-button/PressableButton.styles";
import { Pressable, Text } from "react-native";

interface PressableButtonProps extends React.ComponentProps<typeof Pressable> {
  title: string;
}

const PressableButton: React.FC<PressableButtonProps> = ({
  title,
  ...props
}) => {
  return (
    <Pressable style={styles.button} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default PressableButton;

