import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ExperienciaLaboralService } from '../../services/experiencia-laboral.service';
import { ExperienciaLaboral } from '../../models/experiencia-laboral';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {

  @Input() dataEntrante:any;

  form: FormGroup;

  logo = '';
  inicio = '';
  fin = '';
  uploadedImage : any;
  imgUrl: any;


  constructor(private experienciaLaboralService:ExperienciaLaboralService, private formBuilder: FormBuilder, private modalService: NgbModal) { 

    this.form = this.formBuilder.group({
      empresa:['',[Validators.required, Validators.minLength(3)]],
      cargo:['',[Validators.required, Validators.minLength(8)]],
      logo:[''],
      inicio:['',[Validators.required]],
      fin:['',[Validators.required]]
    })

  }

  ngOnInit(): void {
  }


  open(content: any) {
    console.log(this.dataEntrante);
    this.inicio = new Date(this.dataEntrante.inicio).toISOString().split('T')[0];
    this.fin = new Date(this.dataEntrante.fin).toISOString().split('T')[0];

    this.form.setValue({empresa: this.dataEntrante.empresa, cargo: this.dataEntrante.cargo, logo: '', inicio: this.inicio, fin: this.fin})

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }


  public onImageUpload(event: any) {    
    this.uploadedImage = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    }
  }

  onUpdate() {
 
    const id = this.dataEntrante.id;

    if (this.uploadedImage === undefined) {

      this.logo = '';
      
    }else{

      this.logo = this.uploadedImage.name;
      
    }
    

    const experienciaLaboral = new ExperienciaLaboral(this.form.value.empresa, this.form.value.cargo, this.logo, this.form.value.inicio, this.form.value.fin);

    const formData = new FormData();

    formData.append('file', this.uploadedImage);
    formData.append('experienciaLaboral', JSON.stringify(experienciaLaboral));

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.experienciaLaboralService.updateExperienciaLaboral(id, formData, headers).subscribe({next: data => {
        console.log(data);
        Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha editado correctamente la experiencia laboral',
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
        text: 'Fallo al editar la experiencia laboral',
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
