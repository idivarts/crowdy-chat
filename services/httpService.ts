import axios from "axios";
import { IConversationUnit } from "./interfaces/conversations";
import { IMessageSendRequest, IMessagesResponse } from "./interfaces/messages";

export interface PageUnit {
  id: string;
  name: string;
  userName: string;
  ownerName: string;
  isInstagram: boolean;
  isWebHookConnected: boolean;
  reminderTimeMultiplier: number;
  replyTimeMin: number;
  replyTimeMax: number;
  assistantId: string;
}

interface PagesGetResponse {
  start: number;
  count: number;
  myPages: PageUnit[];
  otherPages: PageUnit[];
}

axios.defaults.baseURL = "https://backend.trendshub.co.in";

export const convertObjectToUrlQuery = (input: {
  [k: string]: any;
}): string => {
  if (Object.keys(input).length === 0) {
    return "";
  }

  const queryParams = [];

  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      if (input[key] == undefined) {
        continue;
      }
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(input[key]);
      queryParams.push(`${encodedKey}=${encodedValue}`);
    }
  }
  if (queryParams.length == 0) return "";
  return "?" + queryParams.join("&");
};

export class HttpService {
  // --------- GET ALL PAGES --------------------

  static getPages = async (userId: string): Promise<PagesGetResponse> => {
    const response = await axios.get(
      "/business/pages?userId=" + (userId ? userId : "TEMP")
    );
    return response.data.pages;
  };

  // --------- PAGE ACTION APIS --------------------

  static setPageWebhook = async (
    pageId: string,
    enable: boolean
  ): Promise<{ message: any }> => {
    const response = await axios.post(`/business/pages/${pageId}/webhook`, {
      enable,
    });
    return response.data;
  };
  static setPageAssistant = async (
    pageId: string,
    data: IAssistantRequest
  ): Promise<{ message: any }> => {
    const response = await axios.post(
      `/business/pages/${pageId}/assistant`,
      data
    );
    return response.data;
  };
  static syncPageMessages = async (
    pageId: string,
    data: IPageSyncRequest
  ): Promise<{ message: any }> => {
    const response = await axios.post(`/business/pages/${pageId}/sync`, data);
    return response.data;
  };

  // --------- CONVERSATION APIS --------------------

  static getConversations = async (req: {
    pageId?: string;
    phase?: number;
  }): Promise<IConversationUnit[]> => {
    const response = await axios.get(
      "/business/conversations" + convertObjectToUrlQuery(req)
    );
    let pData: IConversationUnit[] = response.data.conversations;
    return pData;
  };
  static getConversationById = async (
    igsid: string
  ): Promise<IConversationByIdResponse> => {
    const response = await axios.get(`/business/conversations/${igsid}`);
    return response.data;
  };
  static updateConversation = async (
    igsid: string,
    data: IConversationUpdateRequest
  ): Promise<IConversationUpdateResponse> => {
    const response = await axios.put(`/business/conversations/${igsid}`, data);
    return response.data;
  };

  // --------- MESSAGES APIS --------------------

  static getMessages = async (
    igsid: string,
    req: { after?: string; limit: number }
  ): Promise<IMessagesResponse> => {
    const response = await axios.get(
      `/business/messages/${igsid}` + convertObjectToUrlQuery(req)
    );
    return response.data;
  };
  static sendMessage = async (
    igsid: string,
    req: IMessageSendRequest
  ): Promise<{ message: any }> => {
    const response = await axios.post(`/business/messages/${igsid}`, req);
    return response.data;
  };

  // --------- LOGIN API --------------------

  static login = (data: any) => {
    return axios.post("/business/login", data);
  };
}
