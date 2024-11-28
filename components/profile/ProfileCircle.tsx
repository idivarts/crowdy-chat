import { useAuthContext, useOrganizationContext } from "@/contexts";
import Profile from "@/components/profile/Profile";
import { useRouter } from "expo-router";
import OrganizationSwitcher from "@/components/ui/organization-switcher";
import useBreakpoints from "@/hooks/use-breakpoints";
import { ProfilePopupContextProvider } from "@/contexts/profile-popup-context.provider";

const ProfileCircle: React.FC = () => {
  const { session } = useAuthContext();
  const { currentOrganization } = useOrganizationContext();
  const router = useRouter();
  const { lg } = useBreakpoints();

  return (
    <ProfilePopupContextProvider>
      <Profile />
    </ProfilePopupContextProvider>
  );
};

export default ProfileCircle;
