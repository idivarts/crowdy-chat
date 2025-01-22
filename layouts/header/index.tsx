import React from "react";

import { Logo } from "@/components/ui";
import HeaderSection from "./HeaderSection";
import HeaderContainer from "./HeaderContainer";
import { useAuthContext, useOrganizationContext } from "@/contexts";
import Profile from "@/components/profile/Profile";
import { useRouter } from "expo-router";
import OrganizationSwitcher from "@/components/ui/organization-switcher";
import useBreakpoints from "@/hooks/use-breakpoints";
import { ProfilePopupContextProvider } from "@/contexts/profile-popup-context.provider";
import Button from "@/components/ui/button/Button";

const Header: React.FC = () => {
  const { session } = useAuthContext();
  const { currentOrganization } = useOrganizationContext();
  const router = useRouter();
  const { lg } = useBreakpoints();

  return (
    <ProfilePopupContextProvider>
      <HeaderContainer>
        <HeaderSection gap={lg ? 20 : 10}>
          {
            session && (
              <>
                <Logo imageSrc={currentOrganization?.image} />
                <OrganizationSwitcher />
              </>
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
                  onPress={() => router.push('/signup')}
                >
                  Signup
                </Button>
                <Button
                  onPress={() => router.push('/login')}
                >
                  Login
                </Button>
              </>
            )
          }
        </HeaderSection>
      </HeaderContainer>
    </ProfilePopupContextProvider>
  );
};

export default Header;
