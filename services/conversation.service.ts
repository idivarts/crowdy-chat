import { IConversationUnit } from "@/types/CampaignsBoard";
import APIService from "./api.service";
import { convertObjectToUrlQuery } from "@/helpers/url";

interface UserProfile {
  name: string;
  username: string;
  profile_pic: string;
  follower_count: number;
  is_user_follow_business: boolean;
  is_business_follow_user: boolean;
}

interface Information {
  phase: number;
  engagement: string;
  engagement_unit: string;
  views: string;
  views_unit: string;
  video_category: string;
  brand_category: string;
  collaboration_brand: string;
  collaboration_product: string;
}

interface Conversation {
  igsid: string;
  pageId: string;
  threadId: string;
  lastMid: string;
  lastBotMessageTime: number;
  botMessageCount: number;
  isProfileFetched: boolean;
  userProfile: UserProfile;
  phases: any;
  currentPhase: number;
  information: Information;
  messageQueue: any;
  nextMessageTime: any;
  nextReminderTime: any;
  reminderQueue: any;
  reminderCount: number;
  status: number;
}

interface Page {
  pageId: string;
  connectedId: string;
  userId: string;
  ownerName: string;
  name: string;
  userName: string;
  bio: string;
  isInstagram: boolean;
  accessToken: string;
  assistantId: string;
  isWebhookConnected: boolean;
  status: number;
  reminderTimeMultiplier: number;
  replyTimeMin: number;
  replyTimeMax: number;
}

export interface IConversationByIdResponse {
  conversation: Conversation;
  message?: string;
  page?: Page;
}

export interface IConversationUpdateResponse {
  conversation: Conversation;
  message?: string;
}

export type IConversationUpdateRequest = Partial<Conversation>;

const apiService = new APIService();

export default class ConversationService {
  static getConversations = async (req: {
    pageId?: string;
    phase?: number;
  }): Promise<IConversationUnit[]> => {
    const response = await apiService.apiUrl.get(
      "/business/conversations" + convertObjectToUrlQuery(req)
    );

    let pData: IConversationUnit[] = response.data.conversations;
    return pData;
  };

  static getConversationById = async (
    igsid: string
  ): Promise<IConversationByIdResponse> => {
    const response = await apiService.apiUrl.get(
      `/business/conversations/${igsid}`
    );
    return response.data;
  };

  static updateConversation = async (
    igsid: string,
    data: IConversationUpdateRequest
  ): Promise<IConversationUpdateResponse> => {
    const response = await apiService.apiUrl.put(
      `/business/conversations/${igsid}`,
      data
    );
    return response.data;
  };
}
