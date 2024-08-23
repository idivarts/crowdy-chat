interface IAssistantRequest {
    assistantId: string;
    replyTimeMin: number;
    replyTimeMax: number;
    reminderTimeMultiplier: number;
}

interface IPageSyncRequest {
    all: boolean;
    igsid?: string; // Make the property optional if it may or may not exist in the JSON object
}