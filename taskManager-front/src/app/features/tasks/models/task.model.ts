export interface Task {
  id?: number;
  title: string;
  date: string;
  updatedAt?: string;
  createdAt?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
}