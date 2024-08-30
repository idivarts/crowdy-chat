export type Collectible = {
  name: string;
  type: string;
  description: string;
  mandatory: boolean;
};

export type Reminder = {
  state: boolean;
  reminderCount: string;
  reminderExamples: string;
};

export type Stage = {
  name: string;
  purpose: string;
  collectibles: Collectible[];
  reminderTiming: string;
  stopConversation: boolean;
  leadConversion: boolean;
  reminders: Reminder;
  exampleConversations: string;
};
