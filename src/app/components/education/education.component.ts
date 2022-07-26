import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educaciones: Educacion [] = [];

  constructor(private educacionService : EducacionService) { }

  ngOnInit(): void {
    this.getEdu();
  }

  getEdu(): void {
    this.educacionService.getEducaciones().subscribe({next: data => {
      this.educaciones = data;
    },
    error: err => {
      console.log(err);
    }
  })
  }

  cosita(){
    console.log("prueba");
  }

  deleteEducacion(id: any){
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
        this.educacionService.deleteEducacion(id).subscribe({next: data => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se ha eliminado correctamente la educacion',
            allowOutsideClick: false,
          }).then((result) =>{
            if (result.isConfirmed) {
              this.getEdu();
            }
          })
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Fallo al eliminar la educacion',
            allowOutsideClick: false
          })
          console.log(err)
        }
      })
    }
    })
  
  }

}
