import { PagesGetResponse } from "@/types/PageActions";
import APIService from "./api.service";

const apiService = new APIService();

export default class PageActionsService {
  static getPages = async (userId: string = ""): Promise<PagesGetResponse> => {
    const response = await apiService.apiUrl.get(
      "/business/pages?userId=" + (userId ? userId : "TEMP")
    );
    return response.data.pages;
  };

  static syncPageMessages = async (
    pageId: any,
    data: any // IPageSyncRequest
  ): Promise<{ message: any }> => {
    const response = await apiService.apiUrl.post(
      `/business/pages/${pageId}/sync`,
      data
    );
    return response.data;
  };
}
