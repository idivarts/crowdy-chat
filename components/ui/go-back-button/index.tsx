import { Pressable } from "react-native";
import { useNavigation } from "expo-router";
import { IconButton } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Colors from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

const GoBackButton = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <Pressable key={0} onPress={() => navigation.goBack()}>
      <IconButton
        icon={() =>
          <FontAwesomeIcon
            icon={faArrowLeft}
            color={Colors(theme).text}
            size={18}
          />
        }
        onPress={() => navigation.goBack()}
      />
    </Pressable>
  );
};

export default GoBackButton;
