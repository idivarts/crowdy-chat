import { SourceType } from "@/shared-libs/firestore/crowdy-chat/models/sources";

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
  organizationId: string;
  campaignId: string;
  id: string;
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
  user: {
    id: string;
    email?: string;

    name?: string;

    sourceType: SourceType;
    sourceId: string;

    userProfile?: UserProfile;

    tagId?: string;
    status: number;
    createdAt: number;
    updatedAt: number;
  };
}

export type IConversationsResponse = {
  conversations: IConversationUnit[];
  message: string;
};

export type CampaignsBoardColumn = {
  id: number;
  index: number;
  title: string;
  tasks: IConversationUnit[];
}[];
