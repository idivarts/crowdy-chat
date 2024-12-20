import { Text, View } from "@/components/Themed";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import Button from "../button/Button";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/file-upload-input/FileUploadInput.styles";

interface FileUploadInputProps {
  description?: string;
  onChange: (uri: string) => void;
  buttonText?: string;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  description = "Upload a file",
  onChange,
  buttonText = "Upload File",
}) => {
  const [importedFileName, setImportedFileName] = useState("");
  const theme = useTheme();
  const styles = stylesFn(theme);

  const handleImportFromCSV = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/csv",
      });

      if (
        result.canceled === false
        && result.assets[0].mimeType === "text/csv"
        && result.assets.length === 1
      ) {
        setImportedFileName(result.assets[0].name);
        onChange(result.assets[0].uri);
      } else {
        throw new Error("Invalid file format");
      }
    } catch (err) {
      console.error(err);
      setImportedFileName("Only CSV files are allowed");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.descriptionText}>
          {description} {importedFileName && `(${importedFileName})`}
        </Text>
        <Button
          mode="contained"
          onPress={handleImportFromCSV}
        >
          {buttonText}
        </Button>
      </View>
    </View>
  );
};

export default FileUploadInput;
