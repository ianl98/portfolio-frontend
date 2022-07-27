import { Component, OnInit } from '@angular/core';
import { ExperienciaLaboral } from '../../models/experiencia-laboral';
import { ExperienciaLaboralService } from '../../services/experiencia-laboral.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  experiencias: ExperienciaLaboral [] = [];
  mostrar= true;

  constructor(private experienciaLaboralService: ExperienciaLaboralService) { }

  ngOnInit(): void {
    this.getExp();
  }

  getExp(): void {
    this.experienciaLaboralService.getExperienciasLaborales().subscribe({next: data => {
      this.experiencias = data;
    },
    error: err => {
      console.log(err);
    }
  })
  }


  deleteExperienciaLaboral(id: any){
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
        this.experienciaLaboralService.deleteExperienciaLaboral(id).subscribe({next: data => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se ha eliminado correctamente la experiencia laboral',
            allowOutsideClick: false,
          }).then((result) =>{
            if (result.isConfirmed) {
              this.getExp();
            }
          })
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Fallo al eliminar la Experiencia Laboral',
            allowOutsideClick: false
          })
          console.log(err)
        }
      })
    }
    })
  
  }

}
