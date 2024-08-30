import { IOrganizations } from "@/shared-libs/firestore/crowdy-chat/models/organizations";

export interface Organization extends IOrganizations {
  id: string;
}
