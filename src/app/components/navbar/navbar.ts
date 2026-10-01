import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  links = [
    { nome: 'Início', destino: '#inicio' },
    { nome: 'Skills', destino: '#skills' },
    { nome: 'Projetos', destino: '#projetos' },
    { nome: 'Experiência', destino: '#experiencia' },
    { nome: 'Formação', destino: '#formacao' },
    { nome: 'Contato', destino: '#contato' }
  ];

}