import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEducationComponent } from './components/add-education/add-education.component';
import { EditEducacionComponent } from './components/edit-educacion/edit-educacion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { EditExperienceComponent } from './components/edit-experience/edit-experience.component';
import { SkillComponent } from './components/skill/skill.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { EditSkillComponent } from './components/edit-skill/edit-skill.component';
import { IdiomaComponent } from './components/idioma/idioma.component';
import { AddIdiomaComponent } from './components/add-idioma/add-idioma.component';
import { EditIdiomaComponent } from './components/edit-idioma/edit-idioma.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { TecnologyComponent } from './components/tecnology/tecnology.component';
import { AddTecnologyComponent } from './components/add-tecnology/add-tecnology.component';
import { EditTecnologyComponent } from './components/edit-tecnology/edit-tecnology.component';
import { ProyectComponent } from './components/proyect/proyect.component';
import { AddProyectComponent } from './components/add-proyect/add-proyect.component';
import { EditProyectComponent } from './components/edit-proyect/edit-proyect.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { interceptorProvider } from './services/interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    AddIdiomaComponent,
    EditIdiomaComponent,
    EditPersonComponent,
    TecnologyComponent,
    AddTecnologyComponent,
    EditTecnologyComponent,
    ProyectComponent,
    AddProyectComponent,
    EditProyectComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
