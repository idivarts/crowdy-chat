interface UserProfile {
    name: string;
    username: string;
    profile_pic: string;
    follower_count: number;
    is_user_follow_business: boolean;
    is_business_follow_user: boolean;
}

interface Information {
    phase: number;
    engagement: string;
    engagement_unit: string;
    views: string;
    views_unit: string;
    video_category: string;
    brand_category: string;
    collaboration_brand: string;
    collaboration_product: string;
}

interface Conversation {
    igsid: string;
    pageId: string;
    threadId: string;
    lastMid: string;
    lastBotMessageTime: number;
    botMessageCount: number;
    isProfileFetched: boolean;
    userProfile: UserProfile;
    phases: any; // Change to specific type if needed
    currentPhase: number;
    information: Information;
    messageQueue: any; // Change to specific type if needed
    nextMessageTime: any; // Change to specific type if needed
    nextReminderTime: any; // Change to specific type if needed
    reminderQueue: any; // Change to specific type if needed
    reminderCount: number;
    status: number;
}

interface Page {
    pageId: string;
    connectedId: string;
    userId: string;
    ownerName: string;
    name: string;
    userName: string;
    bio: string;
    isInstagram: boolean;
    accessToken: string;
    assistantId: string;
    isWebhookConnected: boolean;
    status: number;
    reminderTimeMultiplier: number;
    replyTimeMin: number;
    replyTimeMax: number;
}

interface IConversationByIdResponse {
    conversation: Conversation;
    message: string;
    page: Page;
}

interface IConversationUpdateResponse {
    conversation: Conversation;
    message: string;
}
type IConversationUpdateRequest = Partial<Conversation>

