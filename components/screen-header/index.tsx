import { View } from "../Themed";
import Colors from "@/constants/Colors";
import { faArrowLeft, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useTheme } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import { Appbar } from "react-native-paper";

interface ScreenHeaderProps {
  leftIcon?: IconDefinition | null;
  action?: () => void;
  title: string;
  rightActionButton?: React.ReactNode;
  rightAction?: boolean;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  action,
  title,
  leftIcon = faArrowLeft,
  rightActionButton,
  rightAction = false,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleAction = () => {
    if (action) {
      action();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Appbar.Header
      style={{
        backgroundColor: Colors(theme).background,
        elevation: 0,
        height: 54,
        gap: 12,
      }}
      statusBarHeight={0}
    >
      <View
        style={{
          marginTop: 2,
          marginLeft: 10,
        }}
        lightColor={Colors(theme).transparent}
        darkColor={Colors(theme).transparent}
      >
        <Pressable onPress={handleAction}>
          {leftIcon && (
            <FontAwesomeIcon
              icon={leftIcon}
              size={20}
              color={Colors(theme).text}
              style={{
                alignItems: "center",
              }}
            />
          )}
        </Pressable>
      </View>

      <Appbar.Content title={title} color={Colors(theme).text} />

      <View
        style={{
          marginTop: 2,
          marginRight: 10,
        }}
        lightColor={Colors(theme).transparent}
        darkColor={Colors(theme).transparent}
      >
        {rightAction && rightActionButton}
      </View>
    </Appbar.Header>
  );
};

export default ScreenHeader;
