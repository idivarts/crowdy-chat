import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import styles from "@/styles/dropdown-button/DropdownButton.styles";
import { useState } from "react";
import { Pressable } from "react-native";

interface DropdownButtonProps {
  onPress: () => void;
  title: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  onPress,
  title,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverIn = () => {
    setIsHovered(true);
  }

  const handeHoverOut = () => {
    setIsHovered(false);
  }

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={handleHoverIn}
      onHoverOut={handeHoverOut}
      style={[
        styles.dropdownButton,
        {
          backgroundColor: isHovered ? Colors.regular.lightgray : Colors.regular.white,
        }
      ]}
    >
      <Text
        style={styles.dropdownButtonText}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default DropdownButton;
