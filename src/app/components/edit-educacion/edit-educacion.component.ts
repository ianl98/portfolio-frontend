import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Educacion } from '../../models/educacion';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { EducacionService } from '../../services/educacion.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent implements OnInit {

  @Input() dataEntrante:any;

  form: FormGroup;

 public institucion = '';
  carrera = '';
  foto = "";
  inicio = '';
  fin = '';
  uploadedImage : any;
  imgUrl: any;
  closeResult= '';

  constructor(private educacionService : EducacionService,private formBuilder: FormBuilder, private modalService: NgbModal) { 
    
    this.form = this.formBuilder.group({
      institucion:['',[Validators.required, Validators.minLength(3)]],
      carrera:['',[Validators.required, Validators.minLength(8)]],
      foto:[''],
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

    this.form.setValue({institucion: this.dataEntrante.institucion, carrera: this.dataEntrante.carrera, foto: '', inicio: this.inicio, fin: this.fin})

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

      this.foto = '';
      
    }else{

      this.foto = this.uploadedImage.name;
      
    }
    

    const educacion = new Educacion(this.form.value.institucion, this.form.value.carrera, this.foto, this.form.value.inicio, this.form.value.fin);

    const formData = new FormData();

    formData.append('file', this.uploadedImage);
    formData.append('educacion', JSON.stringify(educacion));

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.educacionService.updateEducacion(id, formData, headers).subscribe({next: data => {
        console.log(data);
        Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha editado correctamente la educacion',
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
        text: 'Fallo al editar la educacion',
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
