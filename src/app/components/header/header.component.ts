import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona';
import { PersonaService } from '../../services/persona.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;

  personas: Persona [] = [];

  constructor(private personaService: PersonaService, private tokenService: TokenService,private router: Router) { }

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    }

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

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }

  login(){
    this.router.navigate(['/login']);
  }

}
