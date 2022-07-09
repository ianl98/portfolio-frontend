import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educaciones: Educacion [] = [];

  constructor(private educacionService : EducacionService) { }

  ngOnInit(): void {
    this.getEdu();
  }

  getEdu(): void {
    this.educacionService.getEducaciones().subscribe({next: data => {
      this.educaciones = data;
    },
    error: err => {
      console.log(err);
    }
  })
  }

}
