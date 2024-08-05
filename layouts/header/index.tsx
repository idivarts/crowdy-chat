import { Button } from "react-native";

import { Logo } from "@/components/ui";
import HeaderSection from "./HeaderSection";
import HeaderContainer from "./HeaderContainer";

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderSection>
        <Logo />
      </HeaderSection>
      <HeaderSection>
        <Button title="Signup"/>
        <Button title="Login"/>
      </HeaderSection>
    </HeaderContainer>
  );
};

export default Header;
