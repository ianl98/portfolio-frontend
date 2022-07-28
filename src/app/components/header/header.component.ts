import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  personas: Persona [] = [];

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {

    this.getPer();
  }

  getPer(): void {
    this.personaService.getPersonas().subscribe({next: data => {
      this.personas = data;
    },
    error: err => {
      console.log(err);
    }
  })
  }

}
