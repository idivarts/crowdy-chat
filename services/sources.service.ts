import { ICampaigns } from "@/shared-libs/firestore/crowdy-chat/models/campaigns";
import APIService from "./newApi.service";
import { convertObjectToUrlQuery } from "@/helpers/url";
import Toaster from "@/shared-uis/components/toaster/Toaster";

const apiService = new APIService();

export default class SourceService {
  static changeWebhook = async (req: {
    pageId: string;
    enable: boolean;
    organizationId: string;
    firebaseId: string;
  }) => {
    const response = await apiService.apiUrl.post(
      `https://be.crowdy.chat/api/v1/sources/facebook/${req.pageId}/webhook`,
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
      `https://be.crowdy.chat/api/v1/sources/facebook/${req.pageId}/leads`,
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
