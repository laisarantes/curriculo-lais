import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent {

  constructor(private elementRef: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {

    const hero =
      this.elementRef.nativeElement.querySelector('.hero');

    if (!hero) {
      return;
    }

    const rect = hero.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    hero.style.setProperty('--mx', `${mouseX}px`);
    hero.style.setProperty('--my', `${mouseY}px`);
  }

}