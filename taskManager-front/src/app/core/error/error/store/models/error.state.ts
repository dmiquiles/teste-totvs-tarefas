export interface ErrorState {
  showModal: boolean;
  errorMessage: string | null;
}

export const initialErrorState: ErrorState = {
  showModal: false,
  errorMessage: null,
};