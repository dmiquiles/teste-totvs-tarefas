import { Component, HostBinding, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { themeReducer } from './features/tasks/store/reducers/theme.reducer';
import { selectDarkMode } from './features/tasks/store/selectors/theme.selectors';

interface Task {
  title: string;
  date: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private store: Store, private renderer: Renderer2) {
    this.store.select(selectDarkMode).subscribe((darkMode) => {
      if (darkMode) {
        this.renderer.addClass(document.body, 'dark-mode');
      } else {
        this.renderer.removeClass(document.body, 'dark-mode');
      }
    });
  }
  // filter: 'Todas' | 'Ativas' | 'Concluídas' = 'Todas';
  // searchTerm = '';
  // darkMode = false;

  // newTaskTitle = '';
  // newTaskDate = '';
  // newTaskPriority: 'Baixa' | 'Média' | 'Alta' = 'Baixa';
  // showModal = false;

  // @HostBinding('class.dark') get isDarkMode() {
  //   return this.darkMode;
  // }

  // toggleDarkMode() {
  //   this.darkMode = !this.darkMode;
  // }

  // tasks: Task[] = [
  //   { title: 'Configurar servidor', date: '30/04/2024', priority: 'Baixa', completed: false },
  //   { title: 'Implementar autenticação', date: '28/04/2024', priority: 'Média', completed: false },
  //   { title: 'Atualizar dependências', date: '25/04/2024', priority: 'Alta', completed: false },
  //   { title: 'Refatorar código', date: '20/04/2024', priority: 'Baixa', completed: true },
  // ];

  // get filteredTasks() {
  //   return this.tasks.filter(task => {
  //     const matchSearch = task.title.toLowerCase().includes(this.searchTerm.toLowerCase());
  //     const matchFilter = this.filter === 'Todas' ||
  //       (this.filter === 'Ativas' && !task.completed) ||
  //       (this.filter === 'Concluídas' && task.completed);
  //     return matchSearch && matchFilter;
  //   });
  // }

  // toggleComplete(task: Task) {
  //   task.completed = !task.completed;
  // }

  // setFilter(f: 'Todas' | 'Ativas' | 'Concluídas') {
  //   this.filter = f;
  // }

  // addTask() {
  //   if (this.newTaskTitle.trim() && this.newTaskDate) {
  //     this.tasks.unshift({
  //       title: this.newTaskTitle.trim(),
  //       date: this.newTaskDate,
  //       priority: this.newTaskPriority,
  //       completed: false
  //     });
  //     this.newTaskTitle = '';
  //     this.newTaskDate = '';
  //     this.newTaskPriority = 'Baixa';
  //     this.showModal = false;
  //   }
  // }
}
