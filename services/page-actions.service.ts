import { PagesGetResponse } from "@/types/PageActions";
import APIService from "./newApi.service";

const apiService = new APIService();

export default class PageActionsService {
  static syncPageMessages = async (
    conversationId: any,
    campaignId: any,
    organizationId: any,
    firebaseId: any
  ): Promise<{ message: any }> => {
    const response = await apiService.apiUrl.post(
      `campaigns/${campaignId}/conversations/${conversationId}/sync`,
      {},
      {
        headers: {
          Authorization: `Bearer ${firebaseId}`,
          "X-Organization-ID": organizationId,
        },
      }
    );
    return response.data;
  };
}
