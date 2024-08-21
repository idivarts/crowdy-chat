interface User {
  name: string;
  userName: string;
  profilePic: string;
}

interface Page {
  id: string;
  name: string;
  userName: string;
  isInstagram: boolean;
}

export interface IConversationUnit {
  igsid: string;
  user: User;
  lastBotMessageTime: number;
  botMessageCount: number;
  currentPhase: number;
  reminderCount: number;
  status: number;
  informationCount: number;
  page: Page;
}

export type IConversationsResponse = {
  conversations: IConversationUnit[];
  message: string;
};

export type CampaignsBoardColumn = {
  id: number;
  title: string;
  tasks: IConversationUnit[];
}[];
