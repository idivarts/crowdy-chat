import { IMessageSendRequest, IMessagesResponse } from "@/types/Message";
import APIService from "./api.service";
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
    igsid: string,
    req: IMessageSendRequest
  ): Promise<{
    message: any;
  }> => {
    const response = await apiService.apiUrl.post(
      `/business/messages/${igsid}`,
      req
    );
    return response.data;
  };
}
