import { View } from "../Themed";
import ProfileIcon from "./ProfileIcon";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import styles from "@/styles/profile/Profile.styles";

const Profile = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <View style={styles.container}>
      <ProfileIcon
        size={40}
        onPress={toggleDropdown}
      />
      {
        isDropdownVisible && (
          <ProfileDropdown />
        )
      }
    </View>
  );
};

export default Profile;
