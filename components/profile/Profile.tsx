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
        <DropdownOptions
          position={{
            top: '100%',
            right: 0,
          }}
        >
          <DropdownOption>
            <DropdownButton
              title="Edit Profile"
              onPress={() => {
                setProfilePopupVisible(true)
              }}
            />
          </DropdownOption>
          <DropdownOption>
            <DropdownButton
              title="Logout"
              onPress={handleSignout}
            />
          </DropdownOption>
        </DropdownOptions>
      </Dropdown>
    </View>
  );
};

export default Profile;
