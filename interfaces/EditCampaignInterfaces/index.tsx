export interface IEditCampaign {
    id: string;
    name: string;
    objective: string;
    chatgpt: {
      prescript: string;
      purpose: string;
      actor: string;
      examples: string;
    };
    replySpeed: { min: number; max: number };
    reminderTiming: { min: number; max: number };
    organizationId: string;
    createdBy: string;
    createdAt: number;
    updatedAt: number;
    status: number;
    leadStages?: IEditLeadStage[];
  }
  
  export interface IEditLeadStage {
    id: string;
    name: string;
    purpose: string;
    collectibles?: ICollectible[];
    reminders: {
      state: boolean;
      reminderCount: number;
      reminderExamples: string;
    };
    exampleConversations: string;
    stopConversation: boolean;
    leadConversion: boolean;
  }
  
  export interface ICollectible {
    id: string;
    name: string;
    type: string;
    description: string;
    mandatory: boolean;
  }