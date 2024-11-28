import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import stylesFn from "@/styles/input-field/InputField";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label = "",
  placeholder,
  multiline = false,
  numberOfLines = 1,
  ...props
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        placeholder={placeholder}
        multiline={multiline}
        placeholderTextColor={Colors(theme).text}
        numberOfLines={numberOfLines}
        underlineColorAndroid={"transparent"}
        {...props}
      />
    </View>
  );
};

export default InputField;
