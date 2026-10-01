import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  signal,
} from '@angular/core';

export interface Project {
  nome: string;
  descricao: string;
  tecnologias: string[];
  pipeline: string[];
  link?: string;
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements AfterViewInit, OnDestroy {

  @ViewChild('scroller') scroller!: ElementRef<HTMLElement>;
  @ViewChild('palco') palco!: ElementRef<HTMLElement>;
  @ViewChild('trilha') trilha!: ElementRef<HTMLElement>;

  private frame = 0;
  private alturaAtual = 0;
  private observador?: ResizeObserver;

  projetos = signal<Project[]>([
    {
      nome: 'Olist Data Pipeline',
      descricao: 'Pipeline de Engenharia de Dados de ponta a ponta com Python e PySpark, utilizando arquitetura Medallion, modelagem dimensional e Surrogate Keys.',
      tecnologias: ['Python', 'PySpark', 'SQL', 'Parquet'],
      pipeline: ['Dados brutos', 'Bronze', 'Silver', 'Gold'],
      link: 'https://github.com/laisarantes/olist-pyspark',
    },
    {
      nome: 'Concessionária — Data Transformation',
      descricao: 'Projeto de Engenharia de Dados utilizando PostgreSQL, dbt, Docker e Apache Airflow.',
      tecnologias: ['dbt', 'PostgreSQL', 'Docker', 'Airflow'],
      pipeline: ['PostgreSQL', 'dbt', 'Modelos', 'Airflow'],
      link: 'https://github.com/laisarantes/dbt-concessionaria',
    },
    {
      nome: 'Airflow BCB',
      descricao: 'Pipeline ETL utilizando Apache Airflow, PostgreSQL e Docker.',
      tecnologias: ['Python', 'Airflow', 'PostgreSQL', 'Docker'],
      pipeline: ['API do BCB', 'Airflow', 'PostgreSQL'],
      link: 'https://github.com/laisarantes/airflow-bcb',
    },
    {
      nome: 'Gestão de Resultados — Power BI',
      descricao: 'Projeto de análise de dados com ETL, SQL, DAX e indicadores de desempenho para análise de resultados.',
      tecnologias: ['Power BI', 'SQL', 'DAX', 'ETL'],
      pipeline: ['Dados', 'ETL', 'DAX', 'Power BI'],
    },
  ]);

  ngAfterViewInit(): void {
    this.atualizar();

    if (typeof ResizeObserver !== 'undefined') {
      // recalcula se a largura da trilha mudar (fontes, resize, etc.)
      this.observador = new ResizeObserver(() => this.agendar());
      this.observador.observe(this.trilha.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observador?.disconnect();
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
  @HostListener('window:load')
  agendar(): void {
    if (typeof requestAnimationFrame === 'undefined') return;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.atualizar());
  }

  /* scroll vertical -> deslocamento horizontal da trilha */
  private atualizar(): void {
    if (!this.scroller || !this.palco || !this.trilha) return;

    const wrap = this.scroller.nativeElement;
    const trilha = this.trilha.nativeElement;

    // quanto a trilha precisa andar para mostrar o último card
    const distancia = Math.max(
      0,
      trilha.scrollWidth - this.palco.nativeElement.clientWidth
    );

    // altura do bloco = distância lateral + 1 tela (a que fica "presa")
    const altura = distancia + window.innerHeight;
    if (altura !== this.alturaAtual) {
      this.alturaAtual = altura;
      wrap.style.height = `${altura}px`;
    }

    const topo = wrap.getBoundingClientRect().top;
    const progresso = distancia > 0
      ? Math.min(1, Math.max(0, -topo / distancia))
      : 0;

    trilha.style.transform = `translate3d(${-progresso * distancia}px, 0, 0)`;
  }

  formatar(i: number): string {
    return String(i + 1).padStart(2, '0');
  }
}