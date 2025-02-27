import { Image } from "react-native";
import Button from "./ui/button/Button";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/campaigns/CampaignsList.styles";
import { Text, View } from "./Themed";
import { imageUrl } from "@/helpers/imageurl";

interface EmptyStateProps {
  message: string;
  onPress: () => void;
  image: string;
  buttonName?: string;
  buttonPresent: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = (props: EmptyStateProps) => {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <View style={styles.emptyStateContainer}>
      <Image source={imageUrl(props.image)} style={styles.emptyImage} />
      <Text style={styles.emptyText}>{props.message}</Text>
      {props.buttonPresent && (
        <Button onPress={props.onPress}>{props.buttonName}</Button>
      )}
    </View>
  );
};

export default EmptyState;
