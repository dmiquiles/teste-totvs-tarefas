import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDarkMode } from './features/tasks/store/selectors/theme.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
}
