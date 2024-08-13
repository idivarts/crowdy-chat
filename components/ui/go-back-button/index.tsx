import { Pressable } from "react-native";
import { useNavigation } from "expo-router";
import { View } from "@/components/Themed";
import { IconButton } from "react-native-paper";

const GoBackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable key={0} onPress={() => navigation.goBack()}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
      </View>
    </Pressable>
  );
};

export default GoBackButton;
