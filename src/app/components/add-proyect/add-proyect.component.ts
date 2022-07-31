import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto';

@Component({
  selector: 'app-add-proyect',
  templateUrl: './add-proyect.component.html',
  styleUrls: ['./add-proyect.component.css']
})
export class AddProyectComponent implements OnInit {

  form: FormGroup;

  constructor(private proyectoService: ProyectoService, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(3)]],
      descripcion:['',[Validators.required, Validators.minLength(10)]],
      url:['',[Validators.required]]
    })

   }

  ngOnInit(): void {
  }

  onCreate() {

    const proyecto = new Proyecto(this.form.value.nombre, this.form.value.url, this.form.value.descripcion);

    this.proyectoService.saveProyecto(proyecto).subscribe({next: data => {
        console.log(data);
        Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha guardado correctamente el proyecto',
        allowOutsideClick: false,
      }).then((result) =>{
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    },
    error: err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Fallo al guardar el proyecto',
        allowOutsideClick: false
      }).then((result) =>{
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
      console.log(err)
    }
  })
  }

}
