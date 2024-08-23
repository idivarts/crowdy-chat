import APIService from "./api.service";

const apiService = new APIService();

export default class PageActionsService {
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
