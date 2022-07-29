import { Component, OnInit } from '@angular/core';
import { TecnologiaService } from '../../services/tecnologia.service';
import { Tecnologia } from '../../models/tecnologia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tecnology',
  templateUrl: './tecnology.component.html',
  styleUrls: ['./tecnology.component.css']
})
export class TecnologyComponent implements OnInit {

  tecnologias: Tecnologia [] = [];

  constructor(private tecnologiaService: TecnologiaService) { }

  ngOnInit(): void {

    this.getTec();

  }

  getTec(): void {
    this.tecnologiaService.getTecnologias().subscribe({next: data => {
      this.tecnologias = data;
    },
    error: err => {
      console.log(err);
    }
  })
  }

  deleteTecnologia(id: any){
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
        this.tecnologiaService.deleteTecnologia(id).subscribe({next: data => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se ha eliminado correctamente la habilidad',
            allowOutsideClick: false,
          }).then((result) =>{
            if (result.isConfirmed) {
              this.getTec();
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
