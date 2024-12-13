import { SourceType } from "@/shared-libs/firestore/crowdy-chat/models/sources";

export interface PageUnit {
  id: string;
  name: string;
  userName: string;
  ownerName: string;
  isInstagram: boolean;
  isWebhookConnected: boolean;
  reminderTimeMultiplier: number;
  campaignId: string;
  replyTimeMin: number;
  replyTimeMax: number;
  sourceType: SourceType;
  assistantId: string;
}

export interface PagesGetResponse {
  start: number;
  count: number;
  myPages: PageUnit[];
  otherPages: PageUnit[];
}
