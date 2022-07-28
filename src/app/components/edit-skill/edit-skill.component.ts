import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { HabilidadService } from '../../services/habilidad.service';
import { Habilidad } from '../../models/habilidad';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  @Input() dataEntrante:any;

  form: FormGroup;

  constructor(private habilidadService: HabilidadService, private formBuilder: FormBuilder, private modalService: NgbModal) { 

    this.form = this.formBuilder.group({

      nombre:['',[Validators.required, Validators.minLength(3)]],
      porcentaje:['',[Validators.required, Validators.maxLength(3)]],

    })

  }

  ngOnInit(): void {
  }

  open(content: any) {

    this.form.setValue({nombre: this.dataEntrante.nombre, porcentaje: this.dataEntrante.porcentaje})

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }


  onUpdate() {
 
    const id = this.dataEntrante.id;
    
    const habilidad = new Habilidad(this.form.value.nombre, this.form.value.porcentaje);

    this.habilidadService.updateHabilidad(id, habilidad).subscribe({next: data => {
        console.log(data);
        Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha editado correctamente la habilidad',
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
        text: 'Fallo al editar la habilidad',
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
