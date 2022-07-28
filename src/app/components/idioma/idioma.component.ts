import { Component, OnInit } from '@angular/core';
import { Idioma } from '../../models/idioma';
import { IdiomaService } from '../../services/idioma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
  styleUrls: ['./idioma.component.css']
})
export class IdiomaComponent implements OnInit {

  idiomas: Idioma [] = [];

  constructor(private idiomaService: IdiomaService) { }

  ngOnInit(): void {

    this.getLang();

  }

  getLang(): void {
    this.idiomaService.getIdiomas().subscribe({next: data => {
      this.idiomas = data;
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
        this.idiomaService.deleteIdioma(id).subscribe({next: data => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se ha eliminado correctamente el idioma',
            allowOutsideClick: false,
          }).then((result) =>{
            if (result.isConfirmed) {
              this.getLang();
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
