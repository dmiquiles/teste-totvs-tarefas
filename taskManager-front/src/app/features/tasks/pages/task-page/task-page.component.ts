import { Component, inject, OnInit } from '@angular/core';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TaskHeaderComponent } from "../../components/task-header/task-header.component";
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { TaskSearchComponent } from "../../components/task-search/task-search.component";
import { TaskFilterComponent } from "../../components/task-filter/task-filter.component";
import { Task } from '../../models/task.model';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { selectAllTasks } from '../../store/selectors/task.selectors';
import { CommonModule } from '@angular/common';
import { loadTasks } from '../../store/actions/task.action';

@Component({
  selector: 'app-task-page',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    ContainerComponent,
    TaskListComponent,
    TaskHeaderComponent,
    TaskSearchComponent,
    TaskFilterComponent
],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
  
  // filter: 'Todas' | 'Ativas' | 'Concluídas' = 'Todas';
  // searchTerm: string = '';

  // taskService = inject(TaskListComponent);
  // store = inject(Store);
  
  // tasks: Task[] = [
    // { title: 'Configurar servidor', date: '30/04/2024', priority: 'Baixa', completed: false },
    // { title: 'Implementar autenticação', date: '28/04/2024', priority: 'Média', completed: false },
    // { title: 'Atualizar dependências', date: '25/04/2024', priority: 'Alta', completed: false },
    // { title: 'Refatorar código', date: '20/04/2024', priority: 'Baixa', completed: true },
  // ];
  
  constructor(private store: Store) {}

  // private destroy$ = new Subject<void>(); // Subject para gerenciar o unsubscribe

  tasks$!: Observable<Task[]>;
  // tasks$: Observable<Task[]> = this.store.select('tasks').pipe(
  //   map((state) => state.tasks)
  // );
  
  ngOnInit(): void {
    this.store.dispatch(loadTasks()); // Dispara a ação para carregar as tarefas
    this.tasks$ = this.store.select(selectAllTasks);
  }

  // ngOnDestroy(): void {
  //   this.destroy$.next(); // Emite um valor para completar os observables
  //   this.destroy$.complete(); // Completa o Subject
  // }

  // findAllTasks() {
  //   this.taskService.getAll().pipe(takeUntil(this.destroy$)).subscribe((pageable) => {
  //     this.tasks = pageable.content;
  //   });
  // }


  // filteredTasks$: Observable<any[]> = new Observable();

  // constructor(private store: Store<{ search: { term: string } }>) {}

  // ngOnInit() {
  //   this.filteredTasks$ = this.store.select('search').pipe(
  //     map((state) =>
  //       this.tasks.filter((task) =>
  //         task.title.toLowerCase().includes(state.term.toLowerCase())
  //       )
  //     )
  //   );
  // }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
  }

  // get filteredTasks() {
  //   return this.tasks.filter(task => {
  //     const matchSearch = task.title.toLowerCase().includes(this.searchTerm.toLowerCase());
  //     const matchFilter = this.filter === 'Todas' ||
  //       (this.filter === 'Ativas' && !task.completed) ||
  //       (this.filter === 'Concluídas' && task.completed);
  //     return matchSearch && matchFilter;
  //   });
  // }

}
