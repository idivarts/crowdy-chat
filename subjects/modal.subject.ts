import { IConfirmationModalProps } from "@/components/ConfirmationModal";
import { Subject } from "rxjs";

export const OpenConfirmationModal = new Subject<IConfirmationModalProps>();
