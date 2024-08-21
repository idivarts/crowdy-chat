import { IConversationUpdateResponse } from "@/services/conversation.service";
import { Subject } from "rxjs";

export const UpdateConversationSubject = new Subject<
  IConversationUpdateResponse["conversation"]
>();
