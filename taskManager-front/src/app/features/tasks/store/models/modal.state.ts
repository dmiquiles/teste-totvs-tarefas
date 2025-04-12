import { Task } from "../../models/task.model";

export interface ModalState {
    isOpen: boolean;
    task: Task | null;
}

export const initialModalState: ModalState = {
    isOpen: false,
    task: null,
};