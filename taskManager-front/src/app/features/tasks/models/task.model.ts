export interface Task {
    id?: number;
    titulo: string;
    descricao: string;
    finalizado: boolean;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
  }
  