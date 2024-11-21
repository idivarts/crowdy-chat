import APIService from "./newApi.service";
import Toaster from "@/shared-uis/components/toaster/Toaster";

export type IConversationUpdateRequest = Partial<Conversation>;

const apiService = new APIService();

export default class CampaignService {
  static createCampaign = async (req: {
    campaignId: string;
    organizationId: string;
    firebaseId: string;
  }) => {
    const response = await apiService.apiUrl
      .post(
        `/campaigns/${req.campaignId}`,
        {},
        {
          headers: {
            "X-Organization-ID": req.organizationId,
            Authorization: `Bearer ${req.firebaseId}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          Toaster.success("Campaign created successfully");
        }
      })
      .catch((err) => {
        Toaster.error(err.response.data.message);
      });
  };
}
