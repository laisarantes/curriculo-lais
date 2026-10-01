import { Component, HostListener, signal } from '@angular/core';

export interface Skill {
  nome: string;
  categoria: 'Frontend' | 'Backend' | 'Dados' | 'Ferramentas';
  nivel: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent {

  aberto = signal(false);
  selecionada = signal<Skill | null>(null);

  habilidades: Skill[] = [
    { nome: 'Python', categoria: 'Dados', nivel: 85 },
    { nome: 'SQL', categoria: 'Dados', nivel: 90 },
    { nome: 'Pandas', categoria: 'Dados', nivel: 80 },
    { nome: 'PySpark', categoria: 'Dados', nivel: 70 },
    { nome: 'Airflow', categoria: 'Ferramentas', nivel: 70 },
    { nome: 'dbt', categoria: 'Ferramentas', nivel: 65 },
    { nome: 'PostgreSQL', categoria: 'Backend', nivel: 85 },
    { nome: 'MySQL', categoria: 'Backend', nivel: 80 },
    { nome: 'Node.js', categoria: 'Backend', nivel: 70 },
    { nome: 'Express.js', categoria: 'Backend', nivel: 70 },
    { nome: 'JavaScript', categoria: 'Frontend', nivel: 75 },
    { nome: 'React', categoria: 'Frontend', nivel: 65 },
    { nome: 'Git / GitHub', categoria: 'Ferramentas', nivel: 85 },
    { nome: 'Docker', categoria: 'Ferramentas', nivel: 75 },
    { nome: 'Power BI', categoria: 'Dados', nivel: 70 },
    { nome: 'Excel', categoria: 'Dados', nivel: 75 }
  ];

  alternarBaralho(): void {
    if (this.aberto()) {
      this.aberto.set(false);
      this.selecionada.set(null);
    } else {
      this.aberto.set(true);
    }
  }

  clicarCarta(skill: Skill): void {
    if (!this.aberto()) {
      this.aberto.set(true);
      return;
    }
    this.selecionada.set(this.selecionada() === skill ? null : skill);
  }

  @HostListener('document:keydown.escape')
  aoApertarEsc(): void {
    if (this.selecionada()) {
      this.selecionada.set(null);
    } else if (this.aberto()) {
      this.aberto.set(false);
    }
  }

  formatarNumero(i: number): string {
    return String(i + 1).padStart(2, '0');
  }
}