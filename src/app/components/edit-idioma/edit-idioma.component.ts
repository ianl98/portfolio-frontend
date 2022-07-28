import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { IdiomaService } from '../../services/idioma.service';
import { Nivel } from '../../models/nivel';
import { NivelService } from '../../services/nivel.service';
import { Idioma } from '../../models/idioma';

@Component({
  selector: 'app-edit-idioma',
  templateUrl: './edit-idioma.component.html',
  styleUrls: ['./edit-idioma.component.css']
})
export class EditIdiomaComponent implements OnInit {

  @Input() dataEntrante:any;

  form: FormGroup;

  niveles: Nivel [] = [];

  constructor(private idiomaService: IdiomaService, private nivelService:NivelService, private formBuilder: FormBuilder, private modalService: NgbModal) { 

    this.form = this.formBuilder.group({

      nombre:['',[Validators.required, Validators.minLength(3)]],
      nivel:['',[Validators.required]]

    })

  }

  ngOnInit(): void {
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

  open(content: any) {

    this.getLvl();

    this.form.setValue({nombre: this.dataEntrante.nombre, nivel: this.dataEntrante.nivel.id})

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }


  onUpdate() {
 
    const id = this.dataEntrante.id;

    const nivel = new Nivel(this.form.value.nivel);
    
    const idioma = new Idioma(this.form.value.nombre, nivel);

    this.idiomaService.updateIdioma(id, idioma).subscribe({next: data => {
        console.log(data);
        Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha editado correctamente el idioma',
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
        text: 'Fallo al editar el idioma',
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
