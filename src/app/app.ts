import {
  Component,
  HostListener
} from '@angular/core';

import { HeroComponent } from './components/hero/hero';
import { SkillsComponent } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Education } from './components/education/education';
import { Experience } from './components/experience/experience';
import { Contact } from './components/contact/contact';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    SkillsComponent,
    Projects,
    Education,
    Experience,
    Contact,
    Navbar
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  title = 'curriculo-lais';

  mouseX = 0;
  mouseY = 0;

  heroScale = 1;
  heroOpacity = 1;
  heroBlur = 0;

  @HostListener(
    'document:mousemove',
    ['$event']
  )
  onMouseMove(event: MouseEvent) {

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  @HostListener(
    'window:scroll'
  )
  onScroll() {

    const scroll = window.scrollY;

    const heroHeight = window.innerHeight;

    const progress = Math.min(
      scroll / heroHeight,
      1
    );

    this.heroScale =
      1 - progress * 0.12;

    this.heroOpacity =
      1 - progress * 0.45;

    this.heroBlur =
      progress * 5;
  }

}