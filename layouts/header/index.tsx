import { Button } from "react-native";

import { Logo } from "@/components/ui";
import HeaderSection from "./HeaderSection";
import HeaderContainer from "./HeaderContainer";
import { useAuthContext } from "@/contexts";
import Profile from "@/components/profile/Profile";
import { useRouter } from "expo-router";
import OrganizationSwitcher from "@/components/ui/organization-switcher";
import useBreakpoints from "@/hooks/use-breakpoints";
import { ProfilePopupContextProvider } from "@/contexts/profile-popup-context.provider";

const Header: React.FC = () => {
  const { session } = useAuthContext();
  const router = useRouter();
  const { lg } = useBreakpoints();

  return (
    <ProfilePopupContextProvider>
      <HeaderContainer>
        <HeaderSection gap={lg ? 20 : 10}>
          <Logo />
          {
            session && (
              <OrganizationSwitcher />
            )
          }
        </HeaderSection>
        <HeaderSection gap={lg ? 20 : 10}>
          {
            session ? (
              <Profile />
            ) : (
              <>
                <Button
                  title="Signup"
                  onPress={() => router.push('/(auth)/signup')}
                />
                <Button
                  title="Login"
                  onPress={() => router.push('/(auth)/login')}
                />
              </>
            )
          }
        </HeaderSection>
      </HeaderContainer>
    </ProfilePopupContextProvider>
  );
};

export default Header;
