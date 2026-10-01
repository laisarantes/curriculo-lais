import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  signal,
} from '@angular/core';

export interface EducationItem {
  instituicao: string;
  curso: string;
  periodo: string;
  descricao: string;
  atual?: boolean;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class Education implements AfterViewInit, OnDestroy {

  @ViewChild('lista') lista!: ElementRef<HTMLElement>;
  @ViewChildren('item') itens!: QueryList<ElementRef<HTMLElement>>;

  private frame = 0;

  formacoes = signal<EducationItem[]>([
    {
      instituicao: 'UniAteneu',
      curso: 'Análise e Desenvolvimento de Sistemas',
      periodo: '08/2026 – 07/2028',
      descricao: 'Graduação com foco em desenvolvimento de software, banco de dados, inteligência artificial e tecnologias relacionadas à área de dados.',
      atual: true,
    },
    {
      instituicao: 'Digital College',
      curso: 'Desenvolvedora Full Stack',
      periodo: '03/2025 – 03/2026',
      descricao: 'Formação prática em desenvolvimento web, incluindo JavaScript, Node.js, Express, React, SQL, Docker e Git/GitHub.',
    },
    {
      instituicao: 'Insight English',
      curso: 'Inglês',
      periodo: '07/2025 – 07/2028',
      descricao: 'Formação em língua inglesa com desenvolvimento progressivo das habilidades de comunicação.',
      atual: true,
    },
  ]);

  ngAfterViewInit(): void {
    this.atualizar();
  }

  ngOnDestroy(): void {
    if (typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.frame);
    }
  }

  /* spotlight: guarda a posição do mouse dentro do card */
  aoMover(evento: PointerEvent): void {
    const card = evento.currentTarget as HTMLElement;
    const caixa = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${evento.clientX - caixa.left}px`);
    card.style.setProperty('--my', `${evento.clientY - caixa.top}px`);
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  agendar(): void {
    if (typeof requestAnimationFrame === 'undefined') return;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.atualizar());
  }

  /* acende os cards alcançados e enche a linha neon */
  private atualizar(): void {
    if (!this.lista || !this.itens) return;

    const gatilho = window.innerHeight * 0.75;

    this.itens.forEach(ref => {
      const el = ref.nativeElement;
      if (el.getBoundingClientRect().top < gatilho) {
        el.classList.add('visivel');
      }
    });

    // a linha cresce até o último card alcançado
    const lista = this.lista.nativeElement;
    const caixa = lista.getBoundingClientRect();
    const alvo = window.innerHeight * 0.6;
    const progresso = Math.min(1, Math.max(0, (alvo - caixa.top) / caixa.height));

    lista.style.setProperty('--progresso', progresso.toFixed(3));
  }

  formatar(i: number): string {
    return String(i + 1).padStart(2, '0');
  }
}