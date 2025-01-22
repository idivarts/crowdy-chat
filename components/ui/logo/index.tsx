import { imageUrl } from "@/helpers/imageurl";
import { useBreakPoints } from "@/hooks";
import { Avatar } from "react-native-paper";

interface LogoProps {
  imageSrc?: string;
}

export const Logo: React.FC<LogoProps> = ({
  imageSrc,
}) => {
  const { lg } = useBreakPoints();

  return (
    <Avatar.Image
      source={imageUrl(imageSrc)}
      size={lg ? 40 : 28}
    />
  );
}

export default Logo;
