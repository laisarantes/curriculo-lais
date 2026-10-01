import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  computed,
  signal,
} from '@angular/core';

export interface ExperienceItem {
  empresa: string;
  cargo: string;
  periodo: string;
  tipo: string;
  local: string;
  descricao: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {

  @ViewChildren('aba') abas!: QueryList<ElementRef<HTMLButtonElement>>;

  selecionada = signal(0);

  experiencias = signal<ExperienceItem[]>([
    {
      empresa: 'CODA.CE',
      cargo: 'Líder de Eventos / Liderança de Marketing',
      periodo: '09/2025 – atual',
      tipo: 'Voluntariado',
      local: 'Fortaleza, Ceará',
      descricao: [
        'Atuação na organização e coordenação de eventos da comunidade de tecnologia.',
        'Articulação com palestrantes, parceiros e equipes para planejamento e execução de eventos.',
        'Atuação anterior na liderança de Marketing, contribuindo para planejamento de conteúdo e comunicação da comunidade.',
      ],
    },
    {
      empresa: 'Vicente Lemos',
      cargo: 'Aprendiz',
      periodo: '09/2023 – 08/2024',
      tipo: 'Aprendiz',
      local: 'Barbalha, Ceará',
      descricao: [
        'Esclarecimento de dúvidas e orientação de clientes sobre procedimentos e planos, utilizando comunicação clara e escuta ativa.',
        'Atuação na venda e contratação de planos, identificando as necessidades específicas de cada cliente.',
        'Organização de relatórios e registros de atendimento, contribuindo para a precisão e padronização dos dados da equipe.',
      ],
    },
  ]);

  experiencia = computed(() => this.experiencias()[this.selecionada()]);

  selecionar(i: number): void {
    this.selecionada.set(i);
  }

  /* setas do teclado trocam de aba (padrão de acessibilidade para tabs) */
  aoTeclar(evento: KeyboardEvent): void {
    const total = this.experiencias().length;
    let proxima = this.selecionada();

    switch (evento.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        proxima = (proxima + 1) % total;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        proxima = (proxima - 1 + total) % total;
        break;
      case 'Home':
        proxima = 0;
        break;
      case 'End':
        proxima = total - 1;
        break;
      default:
        return;
    }

    evento.preventDefault();
    this.selecionada.set(proxima);
    this.abas.get(proxima)?.nativeElement.focus();
  }

  /* spotlight: guarda a posição do mouse dentro do painel */
  aoMover(evento: PointerEvent): void {
    const painel = evento.currentTarget as HTMLElement;
    const caixa = painel.getBoundingClientRect();
    painel.style.setProperty('--mx', `${evento.clientX - caixa.left}px`);
    painel.style.setProperty('--my', `${evento.clientY - caixa.top}px`);
  }

  ehAtual(exp: ExperienceItem): boolean {
    return exp.periodo.toLowerCase().includes('atual');
  }

  /* "CODA.CE" -> "coda-ce" (nome do "arquivo" na janela) */
  slug(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  formatar(i: number): string {
    return String(i + 1).padStart(2, '0');
  }
}