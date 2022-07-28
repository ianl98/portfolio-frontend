import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { Persona } from '../../models/persona';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

  @Input() dataEntrante:any;

  form: FormGroup;

  logo = '';
  uploadedImage : any;
  imgUrl: any;

  constructor(private personaService: PersonaService, private formBuilder: FormBuilder, private modalService: NgbModal) {

    this.form = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(3)]],
      apellido:['',[Validators.required, Validators.minLength(8)]],
      sobreMi:['',[Validators.required, Validators.minLength(10)]],
      localidad:['',[Validators.required]],
      titulo:['',[Validators.required]],
      foto:['']
    })

   }

  ngOnInit(): void {
  }

  open(content: any) {

    this.form.setValue({nombre: this.dataEntrante.nombre, apellido: this.dataEntrante.apellido, foto: '', sobreMi: this.dataEntrante.sobreMi, localidad: this.dataEntrante.localidad, titulo: this.dataEntrante.titulo})

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

    const persona = new Persona(this.form.value.nombre, this.form.value.apellido, this.form.value.sobreMi, this.form.value.localidad, this.form.value.titulo, this.logo);

    const formData = new FormData();

    formData.append('file', this.uploadedImage);
    formData.append('persona', JSON.stringify(persona));

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.personaService.updatePersona(id, formData, headers).subscribe({next: data => {
        console.log(data);
        Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha editado correctamente la persona',
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
        text: 'Fallo al editar la persona',
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
