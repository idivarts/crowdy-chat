import { View } from "@/components/Themed";
import { useBreakPoints } from "@/hooks";
import { Image } from "react-native";

export const Logo = () => {
  const { lg } = useBreakPoints();

  return (
    <View>
      <Image
        source={require('@/assets/images/logo.png')}
        style={{
          height: lg ? 40 : 28,
          width: lg ? 40 : 28
        }}
      />
    </View>
  );
}

export default Logo;
