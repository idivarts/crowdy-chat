import {
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";

import { StorageApp } from "@/utils/storage";
import {
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";

interface FirebaseStorageContextProps {
  uploadImage: (image: string, path: string) => Promise<string>;
}

const FirebaseStorageContext = createContext<FirebaseStorageContextProps>(null!);

export const useFirebaseStorageContext = () => useContext(FirebaseStorageContext);

export const FirebaseStorageContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const uploadImage = async (
    image: string,
    path: string,
  ): Promise<string> => {
    const storageRef = ref(StorageApp, path);
    await uploadString(storageRef, image, "data_url");

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  return (
    <FirebaseStorageContext.Provider
      value={{
        uploadImage,
      }}
    >
      {children}
    </FirebaseStorageContext.Provider>
  );
};
