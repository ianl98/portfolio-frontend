import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto';

@Component({
  selector: 'app-edit-proyect',
  templateUrl: './edit-proyect.component.html',
  styleUrls: ['./edit-proyect.component.css']
})
export class EditProyectComponent implements OnInit {

  @Input() dataEntrante:any;

  form: FormGroup;

  constructor(private proyectoService: ProyectoService, private formBuilder: FormBuilder, private modalService: NgbModal) {

    this.form = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(3)]],
      descripcion:['',[Validators.required, Validators.minLength(10)]],
      url:['',[Validators.required]]
    })

   }

  ngOnInit(): void {
  }

  open(content: any) {

    this.form.setValue({nombre: this.dataEntrante.nombre, descripcion: this.dataEntrante.descripcion, url: this.dataEntrante.url})

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  onUpdate() {
 
    const id = this.dataEntrante.id;

    const proyecto = new Proyecto(this.form.value.nombre, this.form.value.url, this.form.value.descripcion);

    this.proyectoService.updateProyecto(id, proyecto).subscribe({next: data => {
        console.log(data);
        Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha editado correctamente el proyecto',
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
        text: 'Fallo al editar el proyecto',
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
