import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import { StyleProp, ViewStyle } from "react-native";
import {
  TextInput as PaperTextInput,
} from "react-native-paper";

export interface TextInputProps extends React.ComponentProps<typeof PaperTextInput> {
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const TextInput: React.FC<TextInputProps> = ({
  containerStyle,
  icon,
  style,
  ...props
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          gap: 6,
          flexDirection: "row",
          backgroundColor: "transparent",
          position: "relative",
          width: "100%",
        },
        containerStyle,
      ]}
    >
      <PaperTextInput
        style={[
          {
            backgroundColor: Colors(theme).background,
            paddingRight: icon ? 36 : 0,
            flex: 1,
          },
          style,
        ]}
        textColor={Colors(theme).text}
        placeholderTextColor={Colors(theme).text}
        activeOutlineColor={Colors(theme).primary}
        mode="outlined"
        {...props}
      />
      {
        icon && (
          <View
            style={{
              position: "absolute",
              right: 5,
              top: 8,
            }}
          >
            {icon}
          </View>
        )
      }
    </View>
  );
};

export default TextInput;
