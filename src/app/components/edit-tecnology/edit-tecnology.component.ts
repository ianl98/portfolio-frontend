import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TecnologiaService } from '../../services/tecnologia.service';
import { Tecnologia } from '../../models/tecnologia';

@Component({
  selector: 'app-edit-tecnology',
  templateUrl: './edit-tecnology.component.html',
  styleUrls: ['./edit-tecnology.component.css']
})
export class EditTecnologyComponent implements OnInit {

  @Input() dataEntrante:any;

  form: FormGroup;

  constructor(private tecnologiaService: TecnologiaService, private formBuilder: FormBuilder, private modalService: NgbModal) {

    this.form = this.formBuilder.group({

      nombre:['',[Validators.required, Validators.minLength(3)]]

    })

   }

  ngOnInit(): void {
  }

  open(content: any) {

    this.form.setValue({nombre: this.dataEntrante.nombre})

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  onUpdate() {
 
    const id = this.dataEntrante.id;
    
    const tecnologia = new Tecnologia(this.form.value.nombre);

    this.tecnologiaService.updateTecnologia(id, tecnologia).subscribe({next: data => {
        console.log(data);
        Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha editado correctamente la tecnologia',
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
        text: 'Fallo al editar la tecnologia',
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
