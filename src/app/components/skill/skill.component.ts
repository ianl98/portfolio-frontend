import { Component, OnInit } from '@angular/core';
import { Habilidad } from '../../models/habilidad';
import { HabilidadService } from '../../services/habilidad.service';
import Swal from 'sweetalert2';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  isLogged = false;

  isAdmin = false;

  habilidades: Habilidad [] = [];

  constructor(private habilidadService:HabilidadService, private tokenService: TokenService) { }

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    }

    if (this.tokenService.getAuthorities().includes("ROLE_ADMIN")) {
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
    
    this.getHab();
  }


  getHab(): void {
    this.habilidadService.getHabilidades().subscribe({next: data => {
      this.habilidades = data;
    },
    error: err => {
      console.log(err);
    }
  })
  }

  deleteHabilidad(id: any){
    Swal.fire({
      title: '¿Está seguro de Eliminar?',
      text: "No se podrá revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.habilidadService.deleteHabilidad(id).subscribe({next: data => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se ha eliminado correctamente la habilidad',
            allowOutsideClick: false,
          }).then((result) =>{
            if (result.isConfirmed) {
              this.getHab();
            }
          })
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Fallo al eliminar la habilidad',
            allowOutsideClick: false
          })
          console.log(err)
        }
      })
    }
    })
  
  }

}
