import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TecnologiaService } from '../../services/tecnologia.service';
import { Tecnologia } from '../../models/tecnologia';

@Component({
  selector: 'app-add-tecnology',
  templateUrl: './add-tecnology.component.html',
  styleUrls: ['./add-tecnology.component.css']
})
export class AddTecnologyComponent implements OnInit {

  form: FormGroup;

  constructor(private tecnologiaService: TecnologiaService, private formBuilder: FormBuilder) { 

    this.form = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(3)]]
    })

  }

  ngOnInit(): void {
  }

  onCreate() {

    const tecnologia = new Tecnologia(this.form.value.nombre);

    this.tecnologiaService.saveTecnologia(tecnologia).subscribe({next: data => {
        console.log(data);
        Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha guardado correctamente la tecnologia',
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
        text: 'Fallo al guardar la tecnologia',
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
