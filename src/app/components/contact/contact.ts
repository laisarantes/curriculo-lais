import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

  contatos = [
    {
      nome: 'LinkedIn',
      valor: 'linkedin.com/in/laís-arantes',
      link: 'https://www.linkedin.com/in/la%C3%ADs-arantes/'
    },
    {
      nome: 'GitHub',
      valor: 'github.com/laisarantes',
      link: 'https://github.com/laisarantes'
    }
  ];

}