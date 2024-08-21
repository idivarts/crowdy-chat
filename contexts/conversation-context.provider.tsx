import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";
import { IConversationUnit } from "@/types/CampaignsBoard";

interface ConversationContextProps {
  allConversation: IConversationUnit[];
  currentConversation: IConversationUnit | undefined;
  setAllConversation: React.Dispatch<React.SetStateAction<IConversationUnit[]>>;
  setCurrentConversation: React.Dispatch<React.SetStateAction<IConversationUnit | undefined>>;
}

const ConversationContext = createContext<ConversationContextProps>({
  allConversation: [],
  currentConversation: undefined,
  setAllConversation: () => null,
  setCurrentConversation: () => null,
});

export const useConversationContext = () => useContext(ConversationContext);

export const ConversationContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [currentConversation, setCurrentConversation] = useState<IConversationUnit | undefined>(undefined) // Added undefined
  const [allConversation, setAllConversation] = useState<IConversationUnit[]>([])

  return (
    <ConversationContext.Provider
      value={{
        allConversation,
        currentConversation,
        setAllConversation,
        setCurrentConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
