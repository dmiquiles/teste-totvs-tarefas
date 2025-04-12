import { Task } from "../../models/task.model";

export interface ModalState {
    isOpen: boolean;
    isDeleteModalOpen: boolean;
  taskId: string | null;
    task: Task | null;
}

export const initialModalState: ModalState = {
    isOpen: false,
    task: null,
    isDeleteModalOpen: false,
  taskId: null,
};