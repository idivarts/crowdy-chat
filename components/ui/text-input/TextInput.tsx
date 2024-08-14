import {
  TextInput as PaperTextInput,
} from "react-native-paper";

interface TextInputProps extends React.ComponentProps<typeof PaperTextInput> { }

const TextInput: React.FC<TextInputProps> = ({
  ...props
}) => {
  return <TextInput {...props} />;
};

export default TextInput;
