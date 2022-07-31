import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto';
import { ProyectoService } from '../../services/proyecto.service';
import Swal from 'sweetalert2';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})
export class ProyectComponent implements OnInit {

  isLogged = false;

  isAdmin = false;

  proyectos : Proyecto [] = [];

  constructor(private proyectoService: ProyectoService, private tokenService: TokenService) { }

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

    this.getProyectos();

  }

  getProyectos(){

    this.proyectoService.getProyectos().subscribe({next: data => {
      this.proyectos = data;
    },
    error: err => {
      console.log(err);
    }
  })

  }

  deleteProeycto(id: any){
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
        this.proyectoService.deleteProyecto(id).subscribe({next: data => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se ha eliminado correctamente el proyecto',
            allowOutsideClick: false,
          }).then((result) =>{
            if (result.isConfirmed) {
              this.getProyectos();
            }
          })
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Fallo al eliminar el proyecto',
            allowOutsideClick: false
          })
          console.log(err)
        }
      })
    }
    })
  
  }

}
