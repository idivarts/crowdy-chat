export interface PageUnit {
  id: string;
  name: string;
  userName: string;
  ownerName: string;
  isInstagram: boolean;
  isWebHookConnected: boolean;
  reminderTimeMultiplier: number;
  replyTimeMin: number;
  replyTimeMax: number;
  assistantId: string;
}

export interface PagesGetResponse {
  start: number;
  count: number;
  myPages: PageUnit[];
  otherPages: PageUnit[];
}
