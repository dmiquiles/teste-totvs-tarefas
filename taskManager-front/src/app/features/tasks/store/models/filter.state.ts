export interface FilterState {
    filter: 'Todas' | 'Ativas' | 'Concluídas';
  }
  
  export const initialFilterState: FilterState = {
    filter: 'Todas',
  };