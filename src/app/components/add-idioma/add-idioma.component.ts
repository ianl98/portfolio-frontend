import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdiomaService } from '../../services/idioma.service';
import { Idioma } from '../../models/idioma';
import { Nivel } from 'src/app/models/nivel';
import { NivelService } from '../../services/nivel.service';

@Component({
  selector: 'app-add-idioma',
  templateUrl: './add-idioma.component.html',
  styleUrls: ['./add-idioma.component.css']
})
export class AddIdiomaComponent implements OnInit {

  form: FormGroup;

  niveles: Nivel [] = [];

  constructor(private idiomaService: IdiomaService, private nivelService: NivelService,private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(3)]],
      nivel:['',[Validators.required]]
    })

   }

  ngOnInit(): void {

    this.getLvl();

  }

  getLvl(){

    this.nivelService.getNiveles().subscribe({next: data => {
      this.niveles = data;
    },
    error: err => {
      console.log(err);
    }
  })

  }

  onCreate() {

    const nivel = new Nivel(this.form.value.nivel);

    const idioma = new Idioma(this.form.value.nombre, nivel);

    this.idiomaService.saveIdioma(idioma).subscribe({next: data => {
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
