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
  id: string;
  organizationId: string;
  campaignId: string;

  sourceId: string;
  threadId: string;
  leadId: string;

  lastMid: string;
  lastBotMessageTime: number;
  botMessageCount: number;
  isProfileFetched: boolean;

  phases: number[];
  currentPhase: number;
  collectibles: {
    [collectibleId: string]: string;
  };
  messageQueue?: string;
  nextMessageTime?: number;
  nextReminderTime?: number;
  reminderQueue?: string;
  reminderCount: number;
  status: number;
  user: any;
}

export type IConversationsResponse = {
  conversations: IConversationUnit[];
  message: string;
};
