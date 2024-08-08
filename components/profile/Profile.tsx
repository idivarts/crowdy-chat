import { View } from "../Themed";
import ProfileIcon from "./ProfileIcon";
import styles from "@/styles/profile/Profile.styles";
import Dropdown from "@/shared-uis/components/dropdown/Dropdown";
import DropdownTrigger from "@/shared-uis/components/dropdown/DropdownTrigger";
import DropdownOptions from "@/shared-uis/components/dropdown/DropdownOptions";
import DropdownOption from "@/shared-uis/components/dropdown/DropdownOption";
import { useAuthContext } from "@/contexts";
import { useRouter } from "expo-router";
import DropdownButton from "@/shared-uis/components/dropdown/DropdownButton";
import { useProfilePopupContext } from "@/contexts/profile-popup-context.provider";
import Toast from "react-native-toast-message";
import Toaster from "@/shared-uis/components/toaster/Toaster";

const Profile = () => {
  const { signOut } = useAuthContext();
  const { setProfilePopupVisible } = useProfilePopupContext();
  const router = useRouter();

  const handleSignout = () => {
    signOut();
    Toaster.success('Logged out successfully!');
    router.replace('/(auth)/login');
  }

  return (
    <View style={styles.container}>
      <Dropdown>
        <DropdownTrigger>
          <ProfileIcon
            size={40}
          />
        </DropdownTrigger>
        <DropdownOptions>
          <DropdownOption onSelect={() => {}}>
            <DropdownButton
              onPress={() => setProfilePopupVisible(true)}
              title="Edit Profile"
            />
          </DropdownOption>
          <DropdownOption onSelect={() => {}}>
            <DropdownButton
              onPress={handleSignout}
              title="Logout"
            />
          </DropdownOption>
        </DropdownOptions>
      </Dropdown>
    </View>
  );
};

export default Profile;
