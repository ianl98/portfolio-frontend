import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperienciaLaboralService } from '../../services/experiencia-laboral.service';
import { ExperienciaLaboral } from '../../models/experiencia-laboral';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {

  form: FormGroup;
  uploadedImage : any;

  constructor(private experienciaLaboralService: ExperienciaLaboralService, private formBuilder: FormBuilder) { 
    
    this.form = this.formBuilder.group({
      empresa:['',[Validators.required, Validators.minLength(3)]],
      cargo:['',[Validators.required, Validators.minLength(8)]],
      logo:['',[Validators.required]],
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

    this.form.value.logo = this.uploadedImage.name;

    const experienciaLaboral = new ExperienciaLaboral(this.form.value.empresa, this.form.value.cargo, this.form.value.logo, this.form.value.inicio, this.form.value.fin);

    const formData = new FormData();

    formData.append('file', this.uploadedImage, this.uploadedImage.name);
    formData.append('experienciaLaboral', JSON.stringify(experienciaLaboral));

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.experienciaLaboralService.saveExperienciaLaboral(formData, headers).subscribe({next: data => {
        console.log(data);
        Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha guardado correctamente la experiencia laboral',
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
        text: 'Fallo al guardar la experiencia laboral',
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
