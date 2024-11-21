import APIService from "./newApi.service";

const apiService = new APIService();

export default class SourceCampaignService {
  static connectSource = async (req: {
    sourceId: string;
    campaignId: string;
    organizationId: string;
    firebaseId: string;
  }) => {
    const response = await apiService.apiUrl.post(
      `campaigns/${req.campaignId}/sources`,
      {
        sourceId: req.sourceId,
      },
      {
        headers: {
          "X-Organization-ID": req.organizationId,
          Authorization: `Bearer ${req.firebaseId}`,
        },
      }
    );
  };

  static disconnectSource = async (req: {
    sourceId: string;
    campaignId: string;
    organizationId: string;
    firebaseId: string;
  }) => {
    const response = await apiService.apiUrl.delete(
      `campaigns/${req.campaignId}/sources?sourceId=${req.sourceId}`,
      {
        headers: {
          "X-Organization-ID": req.organizationId,
          Authorization: `Bearer ${req.firebaseId}`,
        },
      }
    );
  };
}
