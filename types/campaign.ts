import { ICampaigns } from "@/shared-libs/firestore/crowdy-chat/models/campaigns";

export interface Campaign extends ICampaigns {
  id: string;
  image: string;
  totalConversions: number;
  totalLeads: number;
  totalPages: number;
}
