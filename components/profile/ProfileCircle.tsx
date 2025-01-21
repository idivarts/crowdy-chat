import Profile from "@/components/profile/Profile";
import { ProfilePopupContextProvider } from "@/contexts/profile-popup-context.provider";

const ProfileCircle: React.FC = () => {
  return (
    <ProfilePopupContextProvider>
      <Profile />
    </ProfilePopupContextProvider>
  );
};

export default ProfileCircle;
