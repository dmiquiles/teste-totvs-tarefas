export interface Task {
  id?: number;
  title: string;
  date: string;
  updatedAt?: string;
  createdAt?: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  completed: boolean;
}