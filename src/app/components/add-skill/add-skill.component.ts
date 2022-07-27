import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabilidadService } from '../../services/habilidad.service';
import { Habilidad } from '../../models/habilidad';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  
  form: FormGroup;

  constructor(private habilidadService:HabilidadService, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(3)]],
      porcentaje:['',[Validators.required, Validators.maxLength(3)]],
    })


   }

  ngOnInit(): void {
  }

  onCreate() {

    const habilidad = new Habilidad(this.form.value.nombre, this.form.value.porcentaje);

    this.habilidadService.saveHabilidad(habilidad).subscribe({next: data => {
        console.log(data);
        Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha guardado correctamente la habilidad',
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
        text: 'Fallo al guardar la habilidad',
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
