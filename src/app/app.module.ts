import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEducationComponent } from './components/add-education/add-education.component';
import { RouterModule, Routes } from '@angular/router';
import { EditEducacionComponent } from './components/edit-educacion/edit-educacion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { EditExperienceComponent } from './components/edit-experience/edit-experience.component';
import { SkillComponent } from './components/skill/skill.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { EditSkillComponent } from './components/edit-skill/edit-skill.component';
import { IdiomaComponent } from './components/idioma/idioma.component';
import { AddIdiomaComponent } from './components/add-idioma/add-idioma.component';


const appRoutes: Routes = [
  {path: '', component: AppComponent}
]; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ExperienceComponent,
    EducationComponent,
    FooterComponent,
    AddEducationComponent,
    EditEducacionComponent,
    AddExperienceComponent,
    EditExperienceComponent,
    SkillComponent,
    AddSkillComponent,
    EditSkillComponent,
    IdiomaComponent,
    AddIdiomaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
