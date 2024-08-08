import ProfilePopup from '@/components/profile/ProfilePopup';
import { useContext, createContext, type PropsWithChildren, useState } from 'react';

interface ProfilePopupContextProps {
  setProfilePopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfilePopupContext = createContext<ProfilePopupContextProps>({
  setProfilePopupVisible: () => null,
});

export const useProfilePopupContext = () => useContext(ProfilePopupContext);

export const ProfilePopupContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);

  return (
    <ProfilePopupContext.Provider
      value={{
        setProfilePopupVisible,
      }}
    >
      {children}
      {
        isProfilePopupVisible && (
          <ProfilePopup
            visible={isProfilePopupVisible}
            onClose={() => setProfilePopupVisible(false)}
          />
        )
      }
    </ProfilePopupContext.Provider>
  );
}
