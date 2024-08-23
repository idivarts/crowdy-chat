import { Subject } from "rxjs";
import { IConfirmationModalProps } from "@/components/campaigns-open-view/ConfirmationModal.web";

export const OpenConfirmationModal = new Subject<IConfirmationModalProps>();
