import { View } from "@/components/Themed";
import { Image } from "react-native";

export const Logo = () => {
  return (
    <View>
      <Image
        source={require('@/assets/images/logo.png')}
        style={{
          height: 40,
          width: 40,
        }}
      />
    </View>
  );
}

export default Logo;
