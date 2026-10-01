import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'curriculo-lais';
}