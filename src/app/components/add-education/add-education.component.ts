import { Component, OnInit } from '@angular/core';
import { EducacionService } from '../../services/educacion.service';
import { Educacion } from '../../models/educacion';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {

  form: FormGroup;

  institucion = '';
  carrera = '';
  foto = '';
  inicio = new Date;
  fin = '';
  uploadedImage : any;


  constructor(private educacionService : EducacionService, private formBuilder: FormBuilder, private router:Router) { 

    this.form = this.formBuilder.group({
      institucion:['',[Validators.required, Validators.minLength(3)]],
      carrera:['',[Validators.required, Validators.minLength(8)]],
      foto:['',[Validators.required]],
      inicio:['',[Validators.required]],
      fin:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    
  }

  public onImageUpload(event: any) {    
    this.uploadedImage = event.target.files[0];
  }

  onCreate() {
    const imageFormData = new FormData();
    imageFormData.append('file',this.uploadedImage, this.uploadedImage.name);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.educacionService.uploadImage(imageFormData, headers).subscribe({next: data => {
    },
    error: err => {
      console.log(err);
    }
  })

    this.foto = this.uploadedImage.name;

    const educacion = new Educacion(this.institucion, this.carrera, this.foto, this.inicio, this.fin);
    this.educacionService.saveEducacion(educacion).subscribe({next: data => {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha guardado correctamente la educacion',
        allowOutsideClick: false
      }).then((result) =>{
        if (result.isConfirmed) {
          this.router.navigate([''])
        }
      })
    },
    error: err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Fallo al guardar la educacion',
        allowOutsideClick: false
      })
      console.log(err);
    }
  })
  }

}
