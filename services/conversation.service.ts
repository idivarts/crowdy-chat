import { IConversationUnit } from "@/types/CampaignsBoard";
import APIService from "./newApi.service";
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
}

export interface IConversationUpdateResponse {
  conversation: IConversationUnit;
  message?: string;
}

export type IConversationUpdateRequest = Partial<Conversation>;

const apiService = new APIService();

export default class ConversationService {
  static getConversations = async (req: {
    pageId?: string | null;
    phase?: number;
  }): Promise<IConversationUnit[]> => {
    const response = await apiService.apiUrl.get(
      "/business/conversations" + convertObjectToUrlQuery(req)
    );

    let pData: IConversationUnit[] = response.data.conversations;
    return pData;
  };

  static getConversationById = async (
    campaignId: string,
    leadId: string,
    after: string | undefined,
    firebaseId: string,
    organizationId: string
  ): Promise<any> => {
    const response = await apiService.apiUrl.get(
      `campaigns/${campaignId}/conversations/${leadId}/messages?limit=${10}${
        after !== undefined ? `&after=${after}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${firebaseId}`,
          "X-Organization-ID": organizationId,
        },
      }
    );
    return response;
  };

  static updateConversation = async (
    campaignId: string,
    igsid: string,
    organizationId: string,
    newPhase: number | undefined,
    status: number | undefined,
    firebaseId: string
  ): Promise<any> => {
    const response = await apiService.apiUrl
      .put(
        `campaigns/${campaignId}/conversations/${igsid}`,
        { currentPhase: newPhase, status: status },
        {
          headers: {
            Authorization: `Bearer ${firebaseId}`,
            "X-Organization-ID": organizationId,
          },
        }
      )
      .catch((err) => {
        console.log("Error updating phase:", err);
      });
  };
}
