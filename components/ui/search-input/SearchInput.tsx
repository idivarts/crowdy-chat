import { View } from "@/components/Themed";
import styles from "@/styles/search-input/SearchInput.styles";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, TextInputProps } from "react-native";

interface SearchInputProps extends TextInputProps {
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, style, ...props }) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search" size={24} color="gray" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        style={styles.input}
        {...props}
      />
    </View>
  );
};

export default SearchInput;
