import { IMessageSendRequest, IMessagesResponse } from "@/types/Message";
import APIService from "./newApi.service";
import { convertObjectToUrlQuery } from "@/helpers/url";

const apiService = new APIService();

export default class MessageService {
  static getMessages = async (
    igsid: string,
    req: { after?: string; limit: number }
  ): Promise<IMessagesResponse> => {
    const response = await apiService.apiUrl.get(
      `/business/messages/${igsid}` + convertObjectToUrlQuery(req)
    );
    return response.data;
  };

  static sendMessage = async (
    campaignId: string,
    conversationId: string,
    req: IMessageSendRequest,
    organizationId: string,
    firebaseToken: string
  ): Promise<{
    message: any;
  }> => {
    const response = await apiService.apiUrl.post(
      `/campaigns/${campaignId}/conversations/${conversationId}/messages`,
      req,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Organization-ID": organizationId,
          Authorization: `Bearer ${firebaseToken}`,
        },
      }
    );
    return response.data;
  };
}
