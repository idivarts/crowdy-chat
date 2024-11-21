import APIService from "./newApi.service";

const apiService = new APIService();

export default class SourceService {
  static changeWebhook = async (req: {
    pageId: string;
    enable: boolean;
    organizationId: string;
    firebaseId: string;
  }) => {
    const response = await apiService.apiUrl.post(
      `sources/facebook/${req.pageId}/webhook`,
      {
        enable: req.enable,
      },
      {
        headers: {
          "X-Organization-ID": req.organizationId,
          Authorization: `Bearer ${req.firebaseId}`,
        },
      }
    );
  };

  static syncChat = async (req: {
    pageId: string;
    organizationId: string;
    firebaseId: string;
  }) => {
    const response = await apiService.apiUrl.post(
      `sources/facebook/${req.pageId}/leads`,
      {},
      {
        headers: {
          "X-Organization-ID": req.organizationId,
          Authorization: `Bearer ${req.firebaseId}`,
        },
      }
    );
  };
}
