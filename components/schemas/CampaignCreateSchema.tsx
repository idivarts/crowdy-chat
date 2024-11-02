import { z } from "zod";

export const stepOneSchema = z.object({
  campaignName: z.string().nonempty("Campaign Name is required."),
  campaignObjective: z.string().nonempty("Campaign Objective is required."),
  replySpeed: z.object({
    min: z.string().regex(/^\d+$/, "Reply Speed min must be numeric."),
    max: z.string().regex(/^\d+$/, "Reply Speed max must be numeric."),
  }),
  reminderTiming: z.object({
    min: z.string().regex(/^\d+$/, "Reminder Timing min must be numeric."),
    max: z.string().regex(/^\d+$/, "Reminder Timing max must be numeric."),
  }),
});

export const stepTwoSchema = z.object({
  prescript: z.string().nonempty("Prescript is required."),
  campaignPurpose: z.string().nonempty("Purpose of the Campaign is required."),
  actorDefinition: z.string().nonempty("Actor Definition is required."),
  dialogues: z.string().nonempty("Dialogues and Examples are required."),
});

const stageSchema = z.object({
  name: z.string().nonempty("Stage Name is required."),
  purpose: z.string().nonempty("Purpose of the Stage is required."),
  collectibles: z.array(
    z.object({
      name: z.string().nonempty("Collectible Name is required."),
      type: z.string().nonempty("Collectible Type is required."),
      description: z.string().nonempty("Collectible Description is required."),
      mandatory: z.boolean(),
    })
  ),
  reminders: z.object({
    state: z.boolean(),
    reminderCount: z.string(),
    reminderExamples: z.string(),
  }),
  exampleConversations: z.string(),
  stopConversation: z.boolean(),
  leadConversion: z.boolean(),
});

export const stepThreeSchema = z.object({
  stages: z.array(stageSchema),
});
