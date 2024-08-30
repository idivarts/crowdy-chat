export const initialCampaigns = [
  {
    assistantId: "CA-001",
    id: "1",
    image: "https://via.placeholder.com/150",
    name: "Campaign 1",
    totalConversions: 50,
    totalLeads: 100,
    totalPages: 3,
    organizationId: "hgpoFwJgYnWDQK3SOCf0",
    objective: "Objective 1",
    createdBy: "User 1",
    createdAt: 1628620800,
    updatedAt: 1628620800,
    status: 1,
    replySpeed: {
      min: 1,
      max: 2,
    },
    reminderTiming: {
      min: 1,
      max: 2,
    },
    chatgpt: {
      prescript: "Prescript 1",
      purpose: "Purpose 1",
      actor: "Actor 1",
      examples: "Examples 1",
    },
    leadStages: [
      {
        organizationId: "hgpoFwJgYnWDQK3SOCf0",
        campaignId: "1",
        name: "Lead Stage 1",
        purpose: "Purpose 1",
        reminders: {
          state: true,
          reminderCount: 1,
          reminderExamples: "Reminder Examples 1",
        },
        exampleConversations: "Example Conversations 1",
        stopConversation: true,
        leadConversion: true,
        collectibles: [
          {
            organizationId: "hgpoFwJgYnWDQK3SOCf0",
            campaignId: "1",
            leadStageId: "1",
            name: "Collectible 1",
            type: "Type 1",
          },
        ],
      },
    ],
    conversations: [
      {
        organizationId: "hgpoFwJgYnWDQK3SOCf0",
        campaignId: "1",
        sourceId: "Source 1",
        threadId: "Thread 1",
        leadId: "1",
        lastMid: "Last Mid 1",
        lastBotMessageTime: 1628620800,
        botMessageCount: 1,
        isProfileFetched: true,
        phases: [1],
        currentPhase: 1,
        collectibles: {
          CollectibleId: "Collectible 1",
        },
        reminderCount: 1,
        status: 1,
      },
    ],
  },
  {
    assistantId: "CA-002",
    id: "2",
    image: "https://via.placeholder.com/150",
    name: "Campaign 2",
    totalConversions: 80,
    totalLeads: 200,
    totalPages: 5,
    organizationId: "ruKWk7vTT92Hb00B3xNI",
    objective: "Objective 2",
    createdBy: "User 2",
    createdAt: 1628620800,
    updatedAt: 1628620800,
    status: 1,
    replySpeed: {
      min: 1,
      max: 2,
    },
    reminderTiming: {
      min: 1,
      max: 2,
    },
    chatgpt: {
      prescript: "Prescript 2",
      purpose: "Purpose 2",
      actor: "Actor 2",
      examples: "Examples 2",
    },
    leadStages: [
      {
        organizationId: "ruKWk7vTT92Hb00B3xNI",
        campaignId: "2",
        name: "Lead Stage 2",
        purpose: "Purpose 2",
        reminders: {
          state: true,
          reminderCount: 1,
          reminderExamples: "Reminder Examples 2",
        },
        exampleConversations: "Example Conversations 2",
        stopConversation: true,
        leadConversion: true,
        collectibles: [
          {
            organizationId: "ruKWk7vTT92Hb00B3xNI",
            campaignId: "2",
            leadStageId: "2",
            name: "Collectible 2",
            type: "Type 2",
          },
        ],
      },
    ],
    conversations: [
      {
        organizationId: "ruKWk7vTT92Hb00B3xNI",
        campaignId: "2",
        sourceId: "Source 2",
        threadId: "Thread 2",
        leadId: "2",
        lastMid: "Last Mid 2",
        lastBotMessageTime: 1628620800,
        botMessageCount: 1,
        isProfileFetched: true,
        phases: [1],
        currentPhase: 1,
        collectibles: {
          CollectibleId: "Collectible 2",
        },
        reminderCount: 1,
        status: 1,
      },
    ],
  },
];
